import { useMyContext } from "../../context"
// import styles from "./myShifts.module.css"

const MyShifts = () => {
    const {bookedShifts} = useMyContext()
    console.log(Object.entries(bookedShifts))
  return (
    <div></div>
  )
}

export default MyShifts