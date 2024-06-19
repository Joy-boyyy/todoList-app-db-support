import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { FaSearch } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Card from "../Cards";

const Home = () => {
  const [userTitle, fillTitleFun] = useState("");
  const [userNotes, userNotesFun] = useState("");
  const [arrayOfObj, arrayOfObjFun] = useState([]);
  const [dummyArrayOfObj, dummyArrayOfObjFun] = useState([]);
  
  const [checkID, checkIDFun] = useState([]);

  const[searchTxt,didSearch]=useState('');

  useEffect(() => {
    const fetchFun = async () => {
      try {
        const fetchVar = await fetch("http://localhost:8000/connectexpress");

        if (fetchVar.ok) {
          const jsonFetData = await fetchVar.json();
          console.log(jsonFetData);

          arrayOfObjFun(jsonFetData);
          dummyArrayOfObjFun(jsonFetData);

        } else {
          console.error("Fetch failed with status:", fetchVar.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFun();
  }, []);

 

  const searchFun=(e)=>{
    didSearch(e.target.value);
    
    const fetchedData=dummyArrayOfObj.filter((mapData)=> mapData.title.toLowerCase().includes(e.target.value.toLowerCase())  || mapData.notes.toLowerCase().includes(e.target.value.toLowerCase()));
    arrayOfObjFun(fetchedData);

    console.log(fetchedData);



  }


  const checkIdsFun = (ID, checkValue) => {
    if (checkValue) {
      checkIDFun(checkID.filter((id) => id !== ID));
    } else {
      checkIDFun([...checkID, ID]);
    }
  };

  // ///////////////////////////////////adding new data

  const didSubmit = async (e) => {
    e.preventDefault();

    const structuredObj = {
      id: uuid(),
      title: userTitle,
      notes: userNotes,
    };

    arrayOfObjFun((prevData) => [...prevData, structuredObj]);

    fillTitleFun("");
    userNotesFun("");

    const additionalData = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(structuredObj),
    };

    await fetch("http://localhost:8000/connectexpress", additionalData);
  };

  //////////////////////////// delete section

 
  const inCardDelFun = async (ID) => {
    const additionalData = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ id: ID }), // Send the ID to delete
    };

    try {
      const delFet = await fetch(
        `http://localhost:8000/connectexpress`,
        additionalData
      );
      const jsonConv = await delFet.json();
      console.log(jsonConv); // Log the response from the server

      // Update state to remove the deleted item
      const updatedArray = arrayOfObj.filter((obj) => obj.id !== ID);
      arrayOfObjFun(updatedArray);
    } catch (err) {
      console.error(`Error while deleting: ${err}`);
      // Handle error as needed (e.g., show an error message to the user)
    }

    const gotIndex = arrayOfObj.findIndex((fI) => fI.id === ID);

    arrayOfObj.splice(gotIndex, 1);

    arrayOfObjFun((prevData) => [...prevData]);
  };

  return (
    <div className="w-screen bg-black p-7 h-screen overflow-hidden ">
      <div className="  bg-slate-700  w-full h-full rounded-lg pt-2 pl-2pr-2  pb-3 overflow-y-auto">
        <nav className="sm:flex sm:flex-row  sm:justify-center  sm:items-center  sm:p-2 flex  flex-col items-center">
          <div className="sm:mr-7 mb-4">
            <img
              className="w-20 h-20 object-cover"
              src="https://shanture.com/wp-content/uploads/2024/06/cropped-2-300x218.png"
              alt="shanture logo"
            />
          </div>
          <div className=" sm:mr-2 mb-4">
            <input

            onChange={searchFun}
              type="search"
              placeholder="Search your List"
              value={searchTxt}
              className=" cursor-pointer border-none outline-none pr-2 pl-2 sm:w-[340px] rounded-[15px] h-8"
            />
          </div>
          <div>
            <button type="button" className="mr-8">
              <span>

<FaSearch size={35} className=" hover: fill-slate-300"/>
              </span>
            </button>

            <Popup
              trigger={
                <button type="button">
                  <IoMdAddCircleOutline
                    size={35}
                    className=" hover: fill-slate-300"
                  />
                </button>
              }
              position="right center"
              modal
            >
              {(close) => (
                <div className=" flex justify-center p-5  ">
                  <form
                    onSubmit={didSubmit}
                    className=" flex flex-col  items-center"
                  >
                    <input
                      id="usertitle"
                      type="input"
                      className=" outline-none w-[250px] self-start border border-black mb-3 pl-2 rounded-md"
                      placeholder="Title"
                      value={userTitle}
                      onChange={(e) => {
                        fillTitleFun(e.target.value);
                      }}
                      required
                    />
                    <br />

                    <textarea
                      onChange={(e) => {
                        userNotesFun(e.target.value);
                      }}
                      required
                      value={userNotes}
                      name="textarea"
                      rows={10}
                      cols={50}
                      placeholder="Your Notes"
                      className="outline-none border border-black rounded-md p-3 w-full h-auto sm:h-[10rem] md:h-[15rem]"
                    ></textarea>

                    <div className="self-start mt-3">
                      <button
                        type="submit"
                        className=" hover:bg-indigo-900  mr-3 bg-indigo-600 rounded-md text-white pl-2 pr-2 pt-1 pb-1"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          close();
                        }}
                        className=" hover:bg-red-500 mr-3 bg-indigo-600 rounded-md text-white pl-2 pr-2 pt-1 pb-1"
                      >
                        {" "}
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </Popup>
          </div>
        </nav>

        <div className="mt-5 text-white flex flex-wrap  h-[600px]">
          {arrayOfObj.map((mapProp) => (
            <Card
              key={mapProp.id}
              objData={mapProp}
              inCardDelFun={inCardDelFun}
              checkIdsFun={checkIdsFun}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
