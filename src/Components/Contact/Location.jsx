import React from 'react'

export const Location = () => {
    return (
        <>
            <div class="find-location blue-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 text-center">
                            <p> <i class="fas fa-map-marker-alt"></i> Find Our Location</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="embed-responsive embed-responsive-21by9">
                <iframe title = "location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26432.42324808999!2d-118.34398767954286!3d34.09378509738966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf07045279bf%3A0xf67a9a6797bdfae4!2sHollywood%2C%20Los%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1576846473265!5m2!1sen!2sbd" width="600" height="450" frameborder="0" style={{"border" : "0"}} allowfullscreen="" class="embed-responsive-item"></iframe>
            </div>
        </>
    )
}
