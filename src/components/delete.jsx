import { useState } from 'react'
import { Spinner } from './spinner'

export function Delete ({ closeModal, user, deleteUser }) {
  const [status, setStatus] = useState(null)

  const handleDelete = () => {
    setStatus('loading')

    fetch(`https://users-crud.academlo.tech/users/${user.id}/`,
      { method: 'DELETE' })
      .then(res => {
        if (!res.ok) {
          setStatus('error')
          return
        }
        deleteUser(user.id)
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }

  return <>
    <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,.3)] px-2 overflow-y-auto flex justify-center items-center" onClick={closeModal}>
      <div onClick={e => e.stopPropagation()} className="flex relative flex-col p-4 px-6 max-w-xs w-full bg-white gap-y-4 max-h-screen overflow-y-auto">
        <h3 className="text-3xl font-bold">Eliminar Usuario</h3>
        <p>Al aceptar se borrará el usuario {user.first_name} {user.last_name}</p>

        <div className="grid grid-cols-2 mt-2 gap-x-2">
          <button onClick={handleDelete} className="py-1 rounded-sm bg-red-600 text-white hover:bg-red-300 hover:text-red-700 transition-colors">
            {
              status === 'loading'
                ? <Spinner className='w-4 h-4 border-1' />
                : status === 'error'
                  ? <span>Hubo un error</span>
                  : status === 'success'
                    ? <span>Borrado</span>
                    : <span>Borrar</span>
            }
          </button>
          <button onClick={closeModal} className="py-1 rounded-sm bg-gray-200 hover:bg-gray-700 hover:text-white transition-colors">Cancelar</button>
        </div>
      </div>
    </div>
  </>
}
