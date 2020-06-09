import { toast } from 'react-toastify'

export function notifyError (msg) {
  toast.error(`⛔ ${msg}`, {
    position: 'top-center',
    autoClose: 4000,
    hideProgressBar: false,
    draggable: true,
    progress: undefined
  })
}

export function notifyInfo (msg) {
  toast.info(`${msg}`, {
    position: 'top-center',
    autoClose: 2500,
    hideProgressBar: true,
    draggable: true
  })
}
