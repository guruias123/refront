import axios from "axios";
import { useEffect, useState, createRef } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot"
import cors from 'cors'
// import QRCode from "react-qr-code";
import QRCode from 'qrcode.react';
// import QrReader from "react-qr-reader";

import { useNavigate, useParams } from "react-router-dom";
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import '../../StyleSheets/form.css'
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

import '../../StyleSheets/smartcard.css';

const SmartCard = () => {

    const {id} = useParams();
    const token = localStorage.getItem('token');
    const naviagte = useNavigate();
    const smartCardId = id;

    const ref = createRef(null);
    
    const [image, setImage] = useState()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [headline, setHeadline] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");

    // loading
    const [allData, setAllData] = useState(false)

    useEffect(() => {
        if(!token) {
            naviagte('/signin')
        }
        getsmartCard();
        setAllData(true)
    }, [])

    const getsmartCard = async() => {
        const headers = {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json; charset=UTF-8'
        }
        try {
           const {data} = await axios.get(`${process.env.REACT_APP_API}/get-unique-smartcard/${smartCardId}`, {headers})
           console.log({data});
           if(data.success) {
               console.log({smartCard: data.smartCard})
               // loading
               setAllData(data)
               setImage(data.smartCard.fileName)
               console.log(data.smartCard.fileName);
               let contact = data.smartCard.contact;
               setHeadline(data.smartCard.headline);
               setFirstName(contact.firstName);
               setLastName(contact.lastName);
               setMobile(contact.phone);
               setEmail(contact.email);
           }
       } catch (error) {
           console.log(error)
       }
   }

    const handleCaptureClick = async (e) => {
    e.preventDefault();
    console.log("working");
    const card =
      document.querySelector('.left-card');
    if (!card) return;

    const canvas = await html2canvas(card);
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'card.png', 'image/png');
};
    // },5000)
//    const handleCaptureClick = () => {
//     var node = document.getElementById('node');

//     htmlToImage.toPng(node)
//     .then(function (dataUrl) {
//         var img = new Image();
//         img.src = dataUrl;
//         document.body.appendChild(img);
//     })
//     .catch(function (error) {
//         console.error('oops, something went wrong!', error);
//     });
//    }

const [imag, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });
 
  const download = (imag, { name = "img", extension = "png" } = {}) => {
    const a = document.createElement("a");
    a.href = imag;
    a.download = createFileName(extension, name);
    a.click();
  };
 
  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
    return ( 
        <>
            {allData && allData === true ? 
        <p>Loading ....</p>
        :
        <div className="SmartCard">
            <div ref={ref} id="node" className="card">
                <div className="left-card">
                    <div>  </div>
                    {/* <img className="card-image" src={image} /> */}
                    {/* <div style={{"display":"flex","flexDirection":"column"}}> */}
                    <div className="card-name">{firstName}{" "} {lastName}</div>
                    <div className="card-headline">{headline}</div>
                    <div className="card-mobile-email"><span><i class="fa fa-phone" aria-hidden="true"></i>{mobile}</span><span><i class="fa fa-envelope" aria-hidden="true"></i>{email}</span></div>
                    {/* </div> */}
                </div>
                <div>
                    <QRCode value={`https://ganeshswami.netlify.app/dashboard/web-resume/${smartCardId}`} fgColor="#fff" bgColor="#000" size="200" />
                </div>
            </div>
            {/* <button onClick={(e) => handleCaptureClick(e)}>Download</button> */}
            <button onClick={downloadScreenshot}>Download</button>
        </div>
}
</>
     );
}
 
export default SmartCard;