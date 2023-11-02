import React, { useRef, useState } from "react"
import { FaTimes } from "react-icons/fa"
import { BsCalendar } from "react-icons/bs"
import ripIm from "../assets/rip.png"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createObituary } from "../api/obituary.api"
import { v4 as uuidv4 } from "uuid"

export function FormModal({
  showForm,
  setShowForm,
  allObituaries,
  setAllObituaries,
  setnewItemCount
}) {

  const [name, setName] = useState("")
  const [birthDate, setBirthDate] = useState("yyyy-mm-dd, --:--: --")
  const [deathDate, setDeathDate] = useState(new Date().toISOString())
  const [image, setImage] = useState({ preview: "", data: "" })
  const [id, setId] = useState("")
  const [buttonText, setButtonText] = useState("Write Obituary")
  const [isFormDisabled, setIsFormDisabled] = useState(false)
  const [imageUploadText, setImageUploadText] = useState(
    "Select an image for the deceased"
  )

  const hiddenFileInput = useRef(null)

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleFileUploadButtonClick() {
    hiddenFileInput.current.click()
  }

  function handleImageChange(e) {
    const fileUploaded = e.target.files[0]
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    })
    setImageUploadText(fileUploaded.name)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log("Submitting request")

    setButtonText(
      "Please Wait. Its not like they're gonna be late for something... "
    )
    setIsFormDisabled(true)

    const id = uuidv4()
    setId(id)

    try {
      const result = await createObituary(
        id,
        name,
        birthDate,
        deathDate,
        image.data
      )
      console.log("New item: ", result)

      setButtonText("Write Obituary")
      setImageUploadText("Select an image for the deceased")
      setShowForm(false)
      setIsFormDisabled(false)
      setAllObituaries(allObituaries.push(result))
      console.log("After setting ")
      console.log(allObituaries)

      setnewItemCount( (newItemCount) => newItemCount + 1);

    } catch (e) {
      console.error("Unable to submit form", e)
      setShowForm(false)
      setIsFormDisabled(false)
      setButtonText("Write Obituary")
    }
  }

  return (
    <div
      className={`${showForm ? "modal-overlay show-modal" : "modal-overlay"}`}
    >
      <div className="modal-container">
        <h3>Create a New Obituary</h3>
        <img src={ripIm}></img>
        <button className="close-modal-btn" onClick={() => setShowForm(false)}>
          <FaTimes></FaTimes>
        </button>
        <div>
          <div className="image-upload-container">
            <button
              className="image-upload-btn"
              onClick={handleFileUploadButtonClick}
            >
              <p>{imageUploadText}</p>
            </button>

            <input
              className=""
              type="file"
              accept="image/*"
              ref={hiddenFileInput}
              onChange={handleImageChange}
              style={{ visibility: "hidden" }}
            ></input>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="name-input-container">
              <label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name of the deceased"
                  required={true}
                  className="form-input"
                  onChange={handleNameChange}
                ></input>
              </label>
            </div>

            <div className="datepickers">
              <div>
                Born: {birthDate}
                <DatePicker
                  showTimeSelect
                  dateFormat="yyyy-mm-dd hh:mm"
                  customInput={<BsCalendar></BsCalendar>}
                  onChange={(newDate) =>
                    setBirthDate(
                      newDate.toLocaleString("en-US", {
                        day: "2-digit",
                        year: "numeric",
                        month: "2-digit",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })
                    )
                  }
                ></DatePicker>
              </div>

              <div className="datepickers">
                <div>
                  Died: {deathDate}
                  <DatePicker
                    showTimeSelect
                    dateFormat="yyyy-mm-dd h:mm"
                    selectsStart
                    customInput={<BsCalendar ref={useRef()}></BsCalendar>}
                    onChange={(newDate) =>
                      setDeathDate(
                        newDate.toLocaleString("en-US", {
                          day: "2-digit",
                          year: "numeric",
                          month: "2-digit",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                      )
                    }
                  ></DatePicker>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isFormDisabled}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
