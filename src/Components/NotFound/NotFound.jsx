import { Helmet } from 'react-helmet'
import error from '../../assets/imgs/error.svg'

function NotFound() {
  return (
    <>
    <Helmet>
        <title>NotFound</title>
      </Helmet>
    <div className="flex justify-center items-center">
    <img src={error} alt="" />
    </div>
    </>
  )
}

export default NotFound
