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
            return reject(this);
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
    let msg = `${title}\n\n${body}\n\ncreated: ${created}\nupdated: ${updated}\n`;
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
      unbox({armored: message, keyfetch}, (err, literals) => {
        if (err) {return reject(err)}
        return resolve(literals[0].toString())
      })
    })
  }
}

export default Key;