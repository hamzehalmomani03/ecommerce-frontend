
import { useAuth } from "./AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="profile-page">
        <div className="profile-card">
          <h1>Profile</h1>

          <p>Please login to view your profile.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-card">
        <p className="profile-label">
          MY ACCOUNT
        </p>

        <h1>Profile</h1>

        <div className="profile-info">
          <div>
            <span>Full Name</span>
            <strong>{user.name}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div>
            <span>Role</span>
            <strong>{user.role}</strong>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;

