import path from 'path'
import Datastore from 'nedb'
import { remote } from 'electron'

export default new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/catalogo.db')
})
