
export const UserProfile = ({ user }) => {
  return (
    <div>
      <p>
        {user.email} <br />
        {user.name}
      </p>
      <p>
        <img
          src={user.photo}
          alt={user.name} 
          referrerPolicy="no-referrer" />
      </p>
    </div>
  )
}
