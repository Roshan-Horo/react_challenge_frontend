import {NavLink} from 'react-router-dom'

const LandingPage = () => {
  return (
    <>
     <div className="text-slate-500">Landing Page</div>

     <NavLink to="/signup">Get Started</NavLink>
    </>
  )
};

export default LandingPage;