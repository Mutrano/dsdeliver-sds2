import { useEffect, useState } from "react";
import { fetchProducts, saveOrder } from "../api";
import Footer from "../Footer";
import { checkIsSelected } from "./helpers";
import OrderLocation from "./OrderLocation";
import OrderSummary from "./OrderSummary";
import ProductsList from "./ProductsList";
import StepsHeader from "./StepsHeader";
import { OrderLocationData, Product } from "./Types";
import { toast } from 'react-toastify';
import "./styles.css";

function Orders() {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();

    const totalPrice = selectedProducts.reduce((sum, item) => {
        return sum + item.price;
    }, 0);

    useEffect(() => {
        fetchProducts()
            .then(response => setProducts(response.data))
            .catch(error =>{
                toast.warning('Erro ao listar produtos');
            })
    }, []);


    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected = checkIsSelected(selectedProducts, product);

        if (isAlreadySelected) {
            const selected = selectedProducts.filter(item => item.id !== product.id);
            setSelectedProducts(selected);
        } else {
            setSelectedProducts(previous => [...previous, product]);
        }
    }

    const handleSubmit = () => {
        const productsIds = selectedProducts.map(({ id }) => ({ id }));
        const payload = {
            ...orderLocation!,
            products: productsIds
        }
        if(payload.address===undefined){
            toast.warning('Selecione um endereço e tente novamente');
        }
        else if(payload.products.length===0){
            toast.warning('Selecione ao menos um produto e tente novamente');
        }
        else{
            saveOrder(payload)
            .then((response) => {
                toast.error(`Pedido enviado com sucesso! Nº ${response.data.id}`);
                setSelectedProducts([]);
            })
            .catch((error) => {
                toast.warning('Erro ao enviar pedido');
                
            })
        }

    }


    return (
        <>
            <div className="orders-container">
                <StepsHeader />
                <ProductsList
                    products={products}
                    onSelectProduct={handleSelectProduct}
                    selectedProducts={selectedProducts}
                />
                <OrderLocation onChangeLocation={location => setOrderLocation(location)} />
                <OrderSummary
                    amount={selectedProducts.length}
                    totalPrice={totalPrice}
                    onSubmit={handleSubmit}
                />
            </div>
            <Footer />
        </>
    );
}
export default Orders;