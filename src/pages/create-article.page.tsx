//
import axios from 'axios'
import { Formik, FormikHelpers } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import FormInput from '../components/form-input.component'

interface FormValues {
  title: string
  email: string
  name: string
  message: string
}

const CreateArticle = () => {
  //
  const navigate = useNavigate()

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      // Send a POST request to the JSONPlaceholder API
      await axios.post('https://jsonplaceholder.typicode.com/posts', values)
      toast.success('Article submitted successfully')
      resetForm()
      navigate('/')
    } catch (error) {
      toast.error('Error creating article')
    } finally {
      setSubmitting(false)
    }
  }
  //
  return (
    <div className="max-w-4xl px-4 mx-auto my-10 space-y-8">
      <Link to={'/'} className="flex -mt-14 md:mt-4 w-full items-center">
        <img
          src="https://img.icons8.com/?size=256&id=15815&format=png"
          alt="back"
          className="h-6"
        />
        <h1 className="text-gray-900 italic text-sm cursor-pointer font-semibold">
          Back
        </h1>
      </Link>
      <h1 className="text-2xl font-bold text-center">Create an Article</h1>
      <Formik
        initialValues={{ title: '', email: '', name: '', message: '' }}
        validationSchema={Yup.object({
          title: Yup.string().required('Title is required').max(100),
          name: Yup.string().required('Author name is required').max(50),
          message: Yup.string().required('Message is required').max(2000),
          email: Yup.string()
            .email('Invalid email address')
            .required('Email Required')
            .matches(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Invalid email address pattern',
            ),
        })}
        onSubmit={handleSubmit}
        className="mt-4 space-y-6"
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Title"
              type="text"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              placeholder="Caveat emptor"
              error={errors.title}
            />
            <FormInput
              label="Author Name"
              type="text"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              placeholder="John Doe"
              error={errors.name}
            />
            <FormInput
              label="Contact Information"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="john.doe@example.com"
              error={errors.email}
            />
            <FormInput
              label="Article Snippet"
              type="message"
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
              placeholder="Enter a snippet of the law article"
              error={errors.message}
              variant="textarea"
            />
            <button
              className="px-6 py-2 flex items-center justify-center gap-2 rounded bg-blue-500 text-white shadow-xl hover:bg-blue-600 mt-6"
              type="submit"
              disabled={isSubmitting}
              data-testid="submit"
            >
              {isSubmitting ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ) : null}
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default CreateArticle
