import kbpgp from 'kbpgp';

const Key = {
  manager: null,
  ring: null,
  create: function(armoredKey, passphrase = false) {
    return new Promise((resolve, reject) => {
      kbpgp.KeyManager.import_from_p3skb({armored: armoredKey}, (err, manager) => {
        if (err) {return reject(err);}

        this.manager = manager;
        if (!passphrase) {
          return resolve(this);
        }

        this.unlock(passphrase)
          .then((resp) => resolve(resp))
          .catch(err => {
            console.error(err);
            return resolve(this);
          });
      })
    })
  },
  unlock: function(passphrase) {
    return new Promise((resolve, reject) => {
      if (!this.manager) {return reject('Cannot unlock.')}

      this.manager.unlock_p3skb({passphrase}, err => {
        if (err) {return reject(err);}

        let ring = new kbpgp.keyring.KeyRing();
        ring.add_key_manager(this.manager);
        this.ring = ring;

        return resolve(this);
      })
    })
  },
  encrypt: function({title, body, created, updated}) {
    let msg = `${title}\n\n${body}\n\ncreated: ${created}\nupdated: ${updated}`;
    let encrypt_for = this.manager;
    return new Promise((resolve, reject) => {
      kbpgp.box({msg, encrypt_for}, (err, result_string, result_buffer) => {
        if (err) {return reject(err);}
        return resolve(result_string);
      })
    })
  },
  decrypt: function(message) {
    if (!this.ring) {throw new Error('Cannot decrypt, missing keyring')}
    return new Promise((resolve, reject) => {
      let keyfetch = this.ring;
      kbpgp.unbox({armored: message, keyfetch}, (err, literals) => {
        if (err) {return reject(err)}
        let message = literals[0].toString().split('\n')

        let title = {title: message.slice(0, 1)[0]}

        let dates = message.slice(message.length - 3, message.length - 1).map(date => {
          let split = date.split(':');
          let key = split[0]
          let value = split.slice(1).join(':')
          return {[key]: value.replace(' ', '')}
        }).reduce((x, y) => Object.assign({}, x, y))

        let body = {body: message.slice(2, message.length - 3).join('\n')}

        let decrypted = Object.assign({}, title, body, dates)

        return resolve(decrypted)
      })
    })
  },
  demo: function(passphrase) {
    return new Promise((resolve, reject) => {
      kbpgp.KeyManager.generate_rsa({userid: 'Demo User'}, (err, manager) => {
        if (err) {reject(err)}
        manager.sign({}, err => {
          if (err) {reject(err)}

          this.manager = manager;
          let ring = new kbpgp.keyring.KeyRing();
          ring.add_key_manager(this.manager);
          this.ring = ring;

          manager.export_private({p3skb: true, passphrase}, (err, armoredKey) => {
            if (err) {reject(err)}
            return resolve({key: this, armoredKey});
          })
        })
      });
    })
  }

}

export default Key;