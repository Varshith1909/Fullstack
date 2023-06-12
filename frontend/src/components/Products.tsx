export function Products(props){
    const { imageUri, postion,price,name, onSearchButtonclick} = props

    return(
    <div>
        <img src={imageUri} alt="image of medicine"/>
        <h2>{name}</h2>
        <div>
            <button onClick={onSearchButtonclick}> search</button>
        </div>


    </div>
    )}
