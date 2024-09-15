<template>
    <a-row justify="center">
        <a-col :xxl="6" :xl="8" :md="12" :sm="18">
            <AuthWrapper>
                <div class="ninjadash-authentication-top">
                    <h2 class="ninjadash-authentication-top__title">
                        Sign in to Dashboard
                    </h2>
                </div>
                <div class="ninjadash-authentication-content">
                    <a-form
                        :model="formState"
                        @submit="handleSubmit"
                        layout="vertical"
                    >
                        <a-form-item name="email" label="Email Address">
                            <a-input
                                type="email"
                                placeholder="user@example.com"
                                v-model:value="formState.email"
                            />
                            <span class="validate-alert" v-if="emailError">{{
                                emailError
                            }}</span>
                        </a-form-item>
                        <a-form-item name="password" label="Password">
                            <a-input
                                type="password"
                                v-model:value="formState.password"
                                placeholder="Password"
                            />
                            <span class="validate-alert" v-if="passwordError">{{
                                passwordError
                            }}</span>
                        </a-form-item>
                        <div class="ninjadash-auth-extra-links">
                            <a-checkbox @change="onChange"
                                >Keep me logged in</a-checkbox
                            >
                            <router-link
                                class="forgot-pass-link"
                                to="/auth/forgotPassword"
                            >
                                Forgot Password?
                            </router-link>
                        </div>
                        <a-form-item>
                            <sdButton
                                class="btn-signin"
                                htmlType="submit"
                                type="primary"
                                :class="{ loading: isLoading }"
                            >
                                <template v-if="isLoading">
                                    <a-spin />
                                    <span style="color: #0d79df"
                                        >Signing in</span
                                    >
                                </template>
                                <template v-else> Sign In </template>
                            </sdButton>
                        </a-form-item>
                    </a-form>
                </div>
                <div class="ninjadash-authentication-bottom">
                    <p>
                        Don't have an account?<router-link to="/auth/register"
                            >Sign up</router-link
                        >
                    </p>
                </div>
            </AuthWrapper>
        </a-col>
    </a-row>
</template>
<script>
import { DataService } from "@/config/dataService/dataService";
import { reactive, ref, defineComponent, h } from "vue";
import { useStore } from "vuex";
import { AuthWrapper } from "./style";
import { useRouter } from "vue-router";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { useToast } from "vue-toastification";

const SignIn = defineComponent({
    name: "SignIn",
    components: { AuthWrapper },
    setup() {
        const { dispatch } = useStore();
        const checked = ref(null);
        const router = useRouter();
        const toast = useToast();

        const emailError = ref("");
        const passwordError = ref("");

        const formState = reactive({
            email: "",
            password: "",
        });

        const indicator = h(LoadingOutlined, {
            style: {
                fontSize: "24px",
            },
            spin: true,
        });

        const isLoading = ref(false);

        const handleSubmit = async () => {
            emailError.value = "";
            passwordError.value = "";

            if (!formState.email) {
                emailError.value = "Please enter your email!";
                return;
            }
            if (!formState.password) {
                passwordError.value = "Please enter your password!";
                return;
            }

            try {
                isLoading.value = true;
                const response = await DataService.post("/login", formState);

                if (response.status === 200) {
                    const { access_token, user, roles, permissions } =
                        response.data;

                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("user", JSON.stringify(user));

                    dispatch("login", {
                        user,
                        access_token,
                        roles,
                        permissions,
                    });

                    router.push("/");
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error("Invalid login credentials.");
                    } else if (error.response.status === 422) {
                        const errorMessages = error.response.data.errors;
                        for (const key in errorMessages) {
                            if (
                                Object.prototype.hasOwnProperty.call(
                                    errorMessages,
                                    key,
                                )
                            ) {
                                toast.error(errorMessages[key][0]);
                            }
                        }
                    } else if (error.response.status === 500) {
                        toast.error("Server error. Please try again later.");
                    } else {
                        toast.error("An unexpected error occurred.");
                    }
                } else {
                    toast.error("Login error: " + error.message);
                }
            } finally {
                isLoading.value = false;
            }
        };

        return {
            isLoading,
            checked,
            handleSubmit,
            formState,
            emailError,
            passwordError,
            indicator,
        };
    },
});

export default SignIn;
</script>

<style scoped>
.validate-alert {
    color: red;
}

.btn-signin {
    background-color: #5b8def; /* primary color */
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    transition:
        background-color 0.3s,
        transform 0.3s;
}

.btn-signin:hover {
    background-color: #3a6fb0; /* darker shade for hover effect */
    transform: scale(1.05);
}

.btn-signin.loading {
    background-color: #ffff; /* loading state color */
}

.loading-icon {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>
