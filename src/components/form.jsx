import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Spinner } from './spinner'
import { CloseIcon } from './icons/close'

export function Form ({ closeModal, addUser, updateUser, update, user }) {
  const [status, setStatus] = useState(null)
  const { register, handleSubmit, reset } = useForm()

  const submit = (data) => {
    setStatus('loading')
    fetch(update ? `https://users-crud.academlo.tech/users/${user.id}/` : 'https://users-crud.academlo.tech/users/',
      { method: update ? 'PUT' : 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        if (!res.ok) {
          setStatus('error')
        }
        return res.json()
      })
      .then(json => {
        update ? updateUser(json) : addUser(json)
        reset()
        setStatus('success')
        setTimeout(() => { closeModal() }, 3000)
      })
  }

  return <div className="fixed top-0 left-0 px-3 w-full h-full bg-[rgba(0,0,0,.3)] overflow-y-auto flex justify-center items-center" onClick={closeModal}>
    <form onSubmit={handleSubmit(submit)} className="flex relative flex-col p-4 px-6 max-w-sm w-full bg-white gap-y-4 max-h-screen overflow-y-auto" onClick={e => e.stopPropagation()}>
      <h2 className='font-bold text-3xl mb-5'>Nuevo Usuario</h2>
      <div className="flex flex-col">
        <label className='font-semibold text-md' htmlFor='nombre'>Nombre</label>
        <input defaultValue={update ? user.first_name : ''} autoFocus className='p-2 border-2 border-gray-400 bg-gray-100 rounded-md outline-none focus:border-gray-600' type='text' id='nombre' name='nombre' placeholder="Nombre" {...register('first_name', { required: true })}/>
      </div>
      <div className="flex flex-col">
        <label className='font-semibold text-md' htmlFor='apellido'>Apellido</label>
        <input defaultValue={update ? user.last_name : ''} className='p-2 border-2 border-gray-400 bg-gray-100 rounded-md outline-none focus:border-gray-600' type='text' id='apellido' name='apellido' placeholder="Apellido" {...register('last_name', { required: true })}/>
      </div>
      <div className="flex flex-col">
        <label className='font-semibold text-md' htmlFor='email'>Email</label>
        <input defaultValue={update ? user.email : ''} className='p-2 border-2 border-gray-400 bg-gray-100 rounded-md outline-none focus:border-gray-600' type='email' id='apellido' name='apellido' placeholder="Email" {...register('email', { required: true })}/>
      </div>
      <div className="flex flex-col">
        <label className='font-semibold text-md' htmlFor='password'>Contraseña</label>
        <input defaultValue={update ? user.password : ''} className='p-2 border-2 border-gray-400 bg-gray-100 rounded-md outline-none focus:border-gray-600' type='password' id='password' name='password' placeholder="Contraseña" {...register('password', { required: true })}/>
      </div>
      <div className="flex flex-col">
        <label className='font-semibold text-md' htmlFor='birthday'>Fecha de Nacimiento</label>
        <input defaultValue={update ? user.birthday : ''} className='p-2 border-2 border-gray-400 bg-gray-100 rounded-md outline-none focus:border-gray-600' type='date' id='birthday' name='birthday' placeholder="Fecha de nacimiento" {...register('birthday', { required: true })}/>
      </div>
      <button className='bg-sky-800 text-white h-10 flex justify-center items-center'>
        {
          status === 'loading'
            ? <Spinner className='w-5 h-5 border-2' />
            : status === 'error'
              ? <span>Hubo un error</span>
              : status === 'success'
                ? <span>El usuario se { update ? 'cambió' : 'creó' } correctamente.</span>
                : <span>Enviar</span>
        }
      </button>

      <button type='button' disabled={status === 'loading' || status === 'success'} className='bg-transparent absolute top-6 right-5' onClick={closeModal}>
        <CloseIcon height={20} width={20} />
      </button>
    </form>
  </div>
}
