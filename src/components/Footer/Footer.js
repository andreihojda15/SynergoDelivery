import React from "react";
import './FooterStyle.css';

let Footer = () => {
    return(
        <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="footer-col">
                    <h4>company</h4>
                    <ul>
                        <li><a href="#">about us</a></li>
                        <li><a href="#">our services</a></li>
                        <li><a href="#">privacy policy</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>get help</h4>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">shipping</a></li>
                        <li><a href="#">returns</a></li>
                        <li><a href="#">order status</a></li>
                        <li><a href="#">payment options</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>socials</h4>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">instagram</a></li>
                        <li><a href="#">linkedin</a></li>
                        <li><a href="#">twitter</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>copyright 2022 SynergoDelivery</p>
            </div>
        </div>
   </footer>
    )
}

export default Footer;