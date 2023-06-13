const Card = (props) => {
    return (
        <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
                  <div className='d-flex flex-wrap justify-content-between'>
                    <div className='d-flex flex-column'>
                      <span className='productName'>{props.product.productName}</span>
                      { props.unthrottled ? <span className='throttling'>Unthrottled </span> :  <span className='throttling'>Unthrottled </span>} 
                    </div>
                    <div className='d-flex flex-wrap justify-content-between  p-2 border'>
                         <div className='d-flex flex-column p-2'>
                              <div className="d-flex justify-content-center align-items-center">
                                  <span className="text-center"><i className="bi bi-arrow-down"></i></span>
                              </div>
                            <span>Download</span> 
                            <span>{props.product.downloadSpeed}{props.product.measurementPS}</span> 
                         </div>
                         <div className='d-flex flex-column p-2'>
                              <div className="d-flex justify-content-center align-items-center">
                                  <span className="text-center"><i className="bi bi-arrow-up"></i></span>
                              </div>
                            <span>Upload</span> 
                            <span>{props.product.uploadSpeedTotal}{props.product.measurementPS}</span> 
                         </div>
                    </div>
                  </div>
                  <div className='d-flex flex-wrap justify-content-around p-4'>
                    <div><span className='rateStyle'>R{props.product.productRate}pm</span></div>
                    <div> <img src={props.product.providerUrl} alt={props.product.provider}></img> </div>
                    <div> <button className='coverageButton p-2'>Check Coverage</button> </div>
                  </div>
            </div>  
    )
}

export default Card;