<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Product's Info</sdHeading>
                <!-- <span>Set Up product's Information</span> -->
            </div>
        </template>
        <BasicFormWrapper v-if="isLoading">
            <a-space>
                <a-spin size="large" />
            </a-space>
        </BasicFormWrapper>

        <BasicFormWrapper v-else>
            <a-form
                :model="formState"
                @finish="handleFinish"
                @finishFailed="handleFinishFailed"
                layout="vertical"
            >
                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Name">
                            <a-input v-model:value="formState.name" readonly />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Price">
                            <a-input v-model:value="formState.price" readonly />
                        </a-form-Item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-Item label="Stock Quantity">
                            <a-input
                                v-model:value="formState.stock_quantity"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-Item label="Sku">
                            <a-input v-model:value="formState.sku" readonly />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-Item label="Barcode">
                            <a-input
                                v-model:value="formState.barcode"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Description">
                            <a-textarea
                                v-model:value="formState.description"
                                readonly
                            />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <div class="setting-form-actions">
                    <sdButton size="default" @click="handleCancel" type="light">
                        Back
                    </sdButton>
                </div>
            </a-form>
        </BasicFormWrapper>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { BasicFormWrapper } from "../../../../styled";
import { defineComponent, reactive, onMounted } from "vue";
//import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const ProductView = defineComponent({
    name: "ProductView",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        //  const toast = useToast();
        //const isLoading = ref(false);

        const formState = reactive({
            name: "",
            description: "",
            price: "",
            stock_quantity: "",
            sku: "",
            barcode: "",
            abbreviation_id: "",
        });

        const fetchProductDetails = async (productId) => {
            try {
                const response = await DataService.get(
                    `/products/${productId}`,
                );
                console.log("Details fetched of a product", response.data);
                const productDetails = response.data.Product;
                return productDetails;
            } catch (error) {
                console.error("Error fetching product details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const productDetails = await fetchProductDetails(props.id);
            Object.assign(formState, productDetails);
        });

        const handleCancel = () => {
            router.push(`/app/products`);
        };

        return {
            formState,
            // handleFinish,
            // handleFinishFailed,
            handleCancel,
        };
    },
});

export default ProductView;
</script>
