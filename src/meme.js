import React from "react"

export default function Meme() {
    const [meme, setMemeImage] = React.useState(
        {
            topText : '',
            bottomText: '',
            randomImage: "http://i.imgflip.com/1bij.jpg"
        }
    )

    const[allMemeImages,setAllMemeImages] = React.useState([])

    React.useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes')
        .then(res=>res.json())
        .then(data=>setAllMemeImages(data.data.memes))
    },[])

    function handleChange(event){
        const {value,name} = event.target
        setMemeImage(prevMemeImage=>{
            return{
                ...prevMemeImage,
                [name] : value
            }
        })
    }
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        let url = allMemeImages[randomNumber].url
        setMemeImage(prevMeme =>{
          return { 
            ...prevMeme,randomImage : url 
        }
        })
    }
   
    return (
        <main>
            <div className="form ">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name='topText'
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick = {getMemeImage}
                >
                    Get a new meme image !
                </button>
                </div>

            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
           
        </main>
    )
}