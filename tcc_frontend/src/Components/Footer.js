import './Styles.css'
import { Card, CardGroup } from 'react-bootstrap'
import Logo from "../Assets/Images/toktoklogo.webp";
import {useState, useEffect} from "react";

function Footer() {
    function createFooter(productName) {
        return (
            <Card className="footerCard">
                <Card.Img variant="top" src={Logo} />
                <Card.Body>
                    {productName}
                </Card.Body>
            </Card>
        )
    }

    const [footerArray, setFooterArray] = useState([]);
    useEffect(()=>{
        // This is an array containing the products name
        const tempProductArray = ['product1', 'product2', 'product3', 'product4'];
        setFooterArray(tempProductArray.map(createFooter));
      }, [])
    
    return (
        <CardGroup className="footerContainer">
            {footerArray}
        </CardGroup>
    )
}

export default Footer;