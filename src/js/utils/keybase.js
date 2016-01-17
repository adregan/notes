import kbpgp from 'kbpgp';

export const createKeyManager = (privateKey, password) => {
  const armored = privateKey;
  const passphrase = password;
  return new Promise((resolve, reject) => {
    kbpgp.KeyManager.import_from_p3skb({armored}, (err, manager) => {
      if (err) {return reject(err);}
      manager.unlock_p3skb({passphrase}, err => {
        if (err) {return reject(err);}

        let ring = new kbpgp.keyring.KeyRing();
        ring.add_key_manager(manager);

        return resolve({manager, ring})
      })
    })
  });
}