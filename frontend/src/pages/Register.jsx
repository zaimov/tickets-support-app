import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {FaUser} from "react-icons/fa"
import {toast} from "react-toastify"
import {useDispatch, useSelector} from "react-redux";
import {register, reset} from "../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const {name, email, password, confirmPassword} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user, isLoading, isSuccess, isError, message} = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  })

  const onChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    let userData = {}

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      userData = {
        name,
        email,
        password
      }
    }

    dispatch(register(userData))
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;