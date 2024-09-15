<template>
    <sdCards>
        <template v-slot:title>
            <div class="setting-card-title">
                <sdHeading as="h4">Edit Product</sdHeading>
                <span>Set Up product's Information</span>
            </div>
        </template>
        <BasicFormWrapper v-if="isLoading">
            <a-space class="loading">
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
                            <a-input v-model:value="formState.name" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-Item label="Price">
                            <a-input v-model:value="formState.price" />
                        </a-form-Item>
                    </a-col>

                    <a-col :span="8">
                        <a-form-Item label="Stock Quantity">
                            <a-input v-model:value="formState.stock_quantity" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-Item label="Sku">
                            <a-input v-model:value="formState.sku" />
                        </a-form-Item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-Item label="Barcode">
                            <a-input v-model:value="formState.barcode" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="8">
                        <a-form-Item label="Description">
                            <a-textarea v-model:value="formState.description" />
                        </a-form-Item>
                    </a-col>
                </a-row>

                <div class="setting-form-actions">
                    <sdButton size="default" htmlType="submit" type="primary">
                        Update
                    </sdButton>
                    &nbsp; &nbsp;
                    <sdButton size="default" @click="handleCancel" type="light">
                        Cancel
                    </sdButton>
                </div>
            </a-form>
        </BasicFormWrapper>
    </sdCards>
</template>

<script>
import { DataService } from "@/config/dataService/dataService";
import { BasicFormWrapper } from "../../../../styled";
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const ProductEdit = defineComponent({
    name: "ProductEdit",
    components: { BasicFormWrapper },
    props: ["id"], // Accept the id prop

    setup(props) {
        const router = useRouter();
        const toast = useToast();
        const isLoading = ref(false);

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

        const updateProductDetails = async (productId, updatedDetails) => {
            try {
                const response = await DataService.put(
                    `/products/${productId}`,
                    updatedDetails,
                );
                console.log("Product updated successfully:", response.data);
            } catch (error) {
                console.error("Error updating product details:", error);
                if (error.response) {
                    console.error("Error response:", error.response);
                }
            }
        };

        onMounted(async () => {
            const productDetails = await fetchProductDetails(props.id);
            Object.assign(formState, productDetails);
        });

        const handleFinish = async () => {
            try {
                isLoading.value = true;

                await updateProductDetails(props.id, formState);
                toast.success("Product updated successfully!");
                // router.push({
                //     path: `/app/drivers/edit/${props.id}`,
                //     query: { _r: Date.now() },
                // });

                console.log("Product details updated successfully");
            } catch (error) {
                toast.error("Error updating Product details");
                console.error("Error updating Product details:", error);
            } finally {
                isLoading.value = false;
            }
        };

        const handleFinishFailed = (errors) => {
            console.log(errors);
        };

        const handleCancel = () => {
            router.push(`/app/products`);
        };

        return {
            formState,
            handleFinish,
            handleFinishFailed,
            handleCancel,
        };
    },
});

export default ProductEdit;
</script>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
