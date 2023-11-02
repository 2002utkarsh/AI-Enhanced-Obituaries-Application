import React, { useEffect, useState } from "react"
import Navbar from "../component/Navbar"
import { FormModal } from "../component/FormModal"
import { getAll } from "../api/obituary.api"
import Item from "../component/Item"

export function Home() {
  const [showForm, setShowForm] = useState(false)
  const [allObituaries, setAllObituaries] = useState([])
  const [loading, setLoading] = useState(false)
  const [newItemCount, setnewItemCount] = useState(0)

  useEffect(() => {
    async function fetchAllObituaries() {
      setLoading(true)
      const data = await getAll()
      setAllObituaries(data)
    }
    
    fetchAllObituaries()

    console.log("Before setting")
    console.log(allObituaries)
    
    setLoading(false)
    console.log(newItemCount)
  }, [newItemCount])

  return loading ? (
    <div>
      <p>Loading</p>
    </div>
  ) : (
    <div>
      <Navbar showForm={showForm} setShowForm={setShowForm}></Navbar>
      <div className="items-center">
        {allObituaries?.length > 0 && newItemCount > 0 ? (
          allObituaries.map((item, id) => {
            const {
              birth_date,
              death_date,
              image_url,
              mp3_url,
              name,
              obituary,
            } = item
            return (
              <Item
                key={id}
                name={name}
                birthDate={birth_date}
                deathDate={death_date}
                imageRef={image_url}
                obituaryText={obituary}
                mp3Url={mp3_url}
              ></Item>
            )
          })
        ) : (
          <h4>No Obituary to display</h4>
        )}
      </div>

      <FormModal
        showForm={showForm}
        setShowForm={setShowForm}
        allObituaries={allObituaries}
        setAllObituaries={setAllObituaries}
        setnewItemCount={setnewItemCount}
      ></FormModal>
    </div>
  )
}
