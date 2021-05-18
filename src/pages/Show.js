import {useState } from "react"


function Show(props){
//grab the id from URL 
   const id = props.match.params.id
   // put the cheese array in its own variable
    const cheese = props.cheese
    //find one cheese among the cheese array
   const paneer = cheese.find((p) => {
       return p._id === id
   })

   //state for form
   const [editForm, setEditForm] = useState(paneer)
   //handleChange Function for Form

   const handleChange = (event) => {
       setEditForm({
           ...editForm,
           [event.target.name] : event.target.value
        })
   }
   //handlecgane when form is submitted
   const handleSubmit = (event) => {
       //to prevent refresh
       event.preventDefault()
       //update the cheese
           props.updateCheese(editForm, paneer._id)
           //redirect back to cheese index
           props.history.push("/")
       
   }

   const removePaneer = () => {
       props.deleteCheese(paneer._id)
       props.history.push("/")
   }


   return (
    <div className="paneer">
    <h1>{paneer.name}</h1>
    <h2>{paneer.countryOfOrigin}</h2>
    <img src={paneer.image} alt={paneer.name} />
   <button id="delete" onClick={removePaneer}>Delete</button>
    <form onSubmit={handleSubmit}>
       <input
       type="text"
       value={editForm.name}
       name="name"
       placeholder="name"
       onChange={handleChange}
       />
       <input
       type="text"
       value={editForm.countryOfOrigin}
       name="countryOfOrigin"
       placeholder="Country of Origin"
       onChange={handleChange}
       />

       <input 
       type="text"
       value={editForm.image}
       name="image"
       placeholder="Image"
       onChange={handleChange}

       />
       <input type="submit" value="Update Cheese"/>

    </form>
 </div>
   
   )  

}

export default Show