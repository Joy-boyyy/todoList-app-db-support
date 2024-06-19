import Popup from "reactjs-popup";
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Card = (props) => {
  const [checkValue, chechFun] = useState(true);
 
  const { objData,inCardDelFun } = props;
  const {id, title, notes } = objData;

 

  const checkBoxFun = (event) => {
  
    chechFun(event.target.checked);

    if(!event.target.checked)
      {
        insideCardDelBtnClicked();
      }


  };




  const insideCardDelBtnClicked=()=>{

    inCardDelFun(id);
  }



  return (
    <li className="h-[160px]  overflow-hidden m-3 list-none border border-white rounded-md p-6 bg-[rgba(255,255,255,0.2)]">
      <div className=" sm:min-w-[200px]">
        <h1 className="font-bold text-3xl mb-2">{title}</h1>

        <p className="overflow-auto break-words mb-3">

          {notes.length>50 ? `${notes.slice(0,280)}   ............more`: notes}
        </p>

        <div className="flex">
          <input
            type="checkbox"
            className=" cursor-pointer w-5 h-5 mr-3  items-center"
            onChange={checkBoxFun}
            checked={checkValue}
          />

          <Popup
            modal
            trigger={
              <div>
                <button type="button" className="flex items-center hover:text-red-500">
                  Show notes{" "}
                  <span>
                    <MdKeyboardDoubleArrowRight />{" "}
                  </span>
                </button>
              </div>
            }
            position="right center"
          >
            {(close) => (
              <div className="p-5">
                <h1 className="font-bold text-3xl mb-3">{title}</h1>
                <p className=" overflow-auto  break-words">{notes}</p>

                <div className="mt-5 text-right">
                  <button type="button" className="mr-10" onClick={insideCardDelBtnClicked}>
                    <MdDelete size={40} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      close();
                    }}
                  >
                    <IoMdCloseCircle size={40} />
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </li>
  );
};

export default Card;
