import PropTypes from "prop-types";
import { useEffect,useRef } from "react";
import { Modal } from 'bootstrap';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DelProductModal ({tempProduct, getProducts, isDelProductModalOpen, setIsDelProductModalOpen}) {
    
    const delProductModalRef = useRef(null);
    useEffect(()=>{
        new Modal(delProductModalRef.current,{
            backdrop: false,
        });
        
        // Modal.getInstance(delProductModalRef.current);
    }, []);


    useEffect(()=>{
        if(isDelProductModalOpen){
            const modalInstance = Modal.getInstance(delProductModalRef.current);
            modalInstance.show();
        }
    },[isDelProductModalOpen])

    const handleCloseDelProductModal = ()=>{
        const modalInstance = Modal.getInstance(delProductModalRef.current);
        modalInstance.hide();
        setIsDelProductModalOpen(false);
    }
    

    const delProduct = async()=>{
        try {
          await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`);
        } catch (error) {
          alert('刪除產品失敗');
          console.log(error);
        }
    };
    
   
    
    
    const handleDelProduct = async()=>{
    try {
        await delProduct();

        getProducts();

        handleCloseDelProductModal();
    } catch (error) {
        alert('刪除產品失敗');
        console.log(error);
    }
    }
    return (
    <div
    ref={delProductModalRef}
    className="modal fade"
    id="delProductModal"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">刪除產品</h1>
                    <button
                        onClick={handleCloseDelProductModal}
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
                    你是否要刪除 
                    <span className="text-danger fw-bold">{tempProduct.title}</span>
                </div>
                <div className="modal-footer">
                    <button
                        onClick={handleCloseDelProductModal}
                        type="button"
                        className="btn btn-secondary"
                    >
                        取消
                    </button>
                    <button  onClick={handleDelProduct} type="button" className="btn btn-danger">
                        刪除
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
};

DelProductModal.propTypes = {
    tempProduct: PropTypes.object.isRequired,
    getProducts: PropTypes.func,
    isDelProductModalOpen: PropTypes.bool.isRequired,
    setIsDelProductModalOpen:PropTypes.func.isRequired
}

export default DelProductModal;