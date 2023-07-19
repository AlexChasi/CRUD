import { GiftIcon } from './icons/gift'
import { PenIcon } from './icons/pen'
import { DeleteIcon } from './icons/delete'
import { useState } from 'react'
import { Delete } from './delete'
import { Form } from './form'

export function UserEntry ({ user, deleteUser, updateUser }) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)

  return <>
    <article className="flex flex-col shadow-md p-2 px-4">
        <h6 className="text-2xl font-semibold mb-2">{user.first_name} {user.last_name}</h6>
        <div className="border-y border-gray-200 flex flex-col py-2 gap-y-2">

          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-400">CORREO</span>
            <p className="">{user.email}</p>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-400">CUMPLEAÑOS</span>
            <div className="flex items-center gap-x-1">
              <GiftIcon height={17} width={17} />
              <p className="">{user.birthday}</p>
            </div>
          </div>

        </div>

        <div className='w-full flex justify-end mt-2 gap-x-1'>
          <button className='p-2 bg-red-600 text-white rounded-md hover:bg-red-300 hover:text-red-700 transition-colors' onClick={() => setDeleteOpen(true)}>
            <DeleteIcon className='h-6 w-6'/>
          </button>
          <button className='p-2 bg-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors' onClick={() => setUpdateOpen(true)} >
            <PenIcon className='h-6 w-6'/>
          </button>
        </div>
    </article>

    {
      updateOpen && <Form closeModal={() => setUpdateOpen(false)} user={user} updateUser={updateUser} update />
    }
    {
      deleteOpen && <Delete closeModal={() => setDeleteOpen(false)} user={user} deleteUser={deleteUser} />
    }
  </>
}
