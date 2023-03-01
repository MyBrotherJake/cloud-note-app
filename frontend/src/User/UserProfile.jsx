
export const UserProfile = ({ user }) => {
  return (
    <div>
      <p>{user.email}</p>
      <p>{user.name}</p>
      <p>
        <img src={user.photo} referrerPolicy="no-referrer" />
      </p>
    </div>
  )
}
