import { Spinner } from './spinner'
import { UserEntry } from './user-entry'

export function UsersList ({ users, setUsers, parentStatus }) {
  const updateUser = (user) => {
    setUsers(prev => {
      const newData = [...prev]
      const index = prev.findIndex(el => el.id === user.id)
      newData[index] = user
      return newData
    })
  }
  const deleteUser = (id) => {
    setUsers(prev => prev.filter(el => el.id !== id))
  }

  return <section className='grid grid-cols-[repeat(auto-fit,_minmax(260px,.5fr))] gap-4 mt-6 place-content-center'>
      {
        parentStatus === 'loading'
          ? <div className='w-full flex justify-center'><Spinner className='w-8 h-8 border-2' /></div>
          : parentStatus === 'error'
            ? <span>Hubo un error</span>
            : users.map(el => <UserEntry key={el.id} deleteUser={deleteUser} updateUser={updateUser} user={el} />)
      }
  </section>
}
