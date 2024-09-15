export default [
    {
        path: "/app/mail",
        name: "mail",
        component: () =>
            import(/* webpackChunkName: "mail" */ "../view/apps/email/Email"),
        children: [
            {
                path: "",
                name: "inbox",
                component: () =>
                    import(
                        /* webpackChunkName: "Inbox" */ "@/view/apps/email/overview/Inbox.vue"
                    ),
            },
            {
                path: "inbox",
                name: "inbox",
                component: () =>
                    import(
                        /* webpackChunkName: "Inbox" */ "@/view/apps/email/overview/Inbox.vue"
                    ),
            },
            {
                path: "starred",
                name: "starred",
                component: () =>
                    import(
                        /* webpackChunkName: "starred" */ "@/view/apps/email/overview/Starred.vue"
                    ),
            },
            {
                path: "sent",
                name: "sent",
                component: () =>
                    import(
                        /* webpackChunkName: "Sent" */ "@/view/apps/email/overview/Sent.vue"
                    ),
            },
            {
                path: "drafts",
                name: "drafts",
                component: () =>
                    import(
                        /* webpackChunkName: "Draft" */ "@/view/apps/email/overview/Draft.vue"
                    ),
            },
            {
                path: "spam",
                name: "spam",
                component: () =>
                    import(
                        /* webpackChunkName: "Spam" */ "@/view/apps/email/overview/Spam.vue"
                    ),
            },
            {
                path: "trash",
                name: "trash",
                component: () =>
                    import(
                        /* webpackChunkName: "Trash" */ "@/view/apps/email/overview/Trash.vue"
                    ),
            },
            {
                path: "/app/mail-single/:id",
                name: "singleMail",
                component: () =>
                    import(
                        /* webpackChunkName: "singleMail" */ "@/view/apps/email/overview/MailDetailView.vue"
                    ),
                children: [
                    {
                        path: "replay",
                        name: "Replay",
                        components: {
                            default: () =>
                                import(
                                    /* webpackChunkName: "singleMail" */ "@/view/apps/email/overview/MailDetailView.vue"
                                ),
                            child: () =>
                                import(
                                    /* webpackChunkName: "replay" */ "@/view/apps/email/overview/MailComposer.vue"
                                ),
                        },
                    },
                    {
                        path: "forward",
                        name: "Forward",
                        component: () => <h1></h1>,
                    },
                ],
            },
        ],
    },
    {
        path: "/app/chat",
        name: "chat",
        component: () =>
            import(
                /* webpackChunkName: "chat" */ "../view/apps/chat/ChatApp.vue"
            ),
        children: [
            {
                name: "private",
                path: "private",
                component: () =>
                    import(
                        /* webpackChunkName: "private" */ "../view/apps/chat/overview/PrivetChat.vue"
                    ),
            },
            {
                name: "privateSingle",
                path: "private/:id",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "private" */ "../view/apps/chat/overview/PrivetChat.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "privateSingle" */ "../view/apps/chat/overview/SingleChat.vue"
                        ),
                },
            },
            {
                name: "group",
                path: "group",
                component: () =>
                    import(
                        /* webpackChunkName: "group" */ "../view/apps/chat/overview/GroupChat.vue"
                    ),
            },
            {
                name: "groupSingle",
                path: "group/:id",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "private" */ "../view/apps/chat/overview/GroupChat.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "privateSingle" */ "../view/apps/chat/overview/SingleGroupChat.vue"
                        ),
                },
            },
            {
                name: "all",
                path: "all",
                component: () =>
                    import(
                        /* webpackChunkName: "all" */ "../view/apps/chat/overview/AllContacts.vue"
                    ),
            },
            {
                name: "allSingle",
                path: "all/:id",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "private" */ "../view/apps/chat/overview/AllContacts.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "privateSingle" */ "../view/apps/chat/overview/SingleChat.vue"
                        ),
                },
            },
        ],
    },

    {
        name: "account",
        path: "/app/accounts",
        component: () =>
            import(
                /* webpackChunkName: "ecommerce" */ "../view/apps/finance/account/Account.vue"
            ),
    },

    {
        name: "AccountView",
        path: "/app/accounts/:id",
        component: () =>
            import(
                /* webpackChunkName: "account-view" */ "../view/apps/finance/account/overview/AccountView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "AccountEdit",
        path: "/app/accounts/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "client-view" */ "../view/apps/finance/account/overview/AccountEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "account-type",
        path: "/app/account-types",
        component: () =>
            import(
                /* webpackChunkName: "ecommerce" */ "../view/apps/finance/account-type/AccountType.vue"
            ),
    },

    {
        name: "AccountTypeView",
        path: "/app/account-types/:id",
        component: () =>
            import(
                /* webpackChunkName: "account-type-view" */ "../view/apps/finance/account-type/overview/AccountTypeView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "AccountTypeEdit",
        path: "/app/account-types/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "account-type-edit" */ "../view/apps/finance/account-type/overview/AccountTypeEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        path: "/app/local-purchase-order",
        name: "purchase-order",
        component: () =>
            import(
                /* webpackChunkName: "purchase-order" */ "../view/apps/finance/purchase-order/LocalPurchaseOrder.vue"
            ),
    },

    {
        path: "/app/local-purchase-order/:id",
        name: "LocalPurchaseOrderView",
        component: () =>
            import(
                /* webpackChunkName: "purchase-order-view" */ "../view/apps/finance/purchase-order/overview/LocalPurchaseOrderView.vue"
            ),
        props: true,
    },

    {
        path: "/app/local-purchase-order/edit/:id",
        name: "LocalPurchaseOrderEdit",
        component: () =>
            import(
                /* webpackChunkName: "purchase-order-view" */ "../view/apps/finance/purchase-order/overview/LocalPurchaseOrderEdit.vue"
            ),
        props: true,
    },

    {
        path: "/app/dispensation-order",
        name: "DispensationOrder",
        component: () =>
            import(
                /* webpackChunkName: "product" */ "../view/apps/finance/purchase-order/DispensationOrder.vue"
            ),
    },

    {
        path: "/app/dispensation-order/:id",
        name: "DispensationOrderView",
        component: () =>
            import(
                /* webpackChunkName: "product" */ "../view/apps/finance/purchase-order/overview/DispensationOrderView.vue"
            ),
        props: true,
    },
    {
        path: "/app/dispensation-order/edit/:id",
        name: "DispensationOrderEdit",
        component: () =>
            import(
                /* webpackChunkName: "product" */ "../view/apps/finance/purchase-order/overview/DispensationOrderEdit.vue"
            ),
        props: true,
    },

    {
        name: "FuelDispensationOrder",
        path: "/app/fuel-dispensation",
        component: () =>
            import(
                /* webpackChunkName: "fuel-dispensation-order" */ "../view/apps/finance/fuel-dispensation/FuelDispensationOrder.vue"
            ),
    },

    {
        name: "FuelDispensationOrderView",
        path: "/app/fuel-dispensation/:id",
        component: () =>
            import(
                /* webpackChunkName: "fuel-dispensation-order-view" */ "../view/apps/finance/fuel-dispensation/overview/FuelDispensationOrderView.vue"
            ),
        props: true,
    },

    {
        name: "FuelDispensationOrderEdit",
        path: "/app/fuel-dispensation/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "fuel-dispensation-order-edit" */ "../view/apps/finance/fuel-dispensation/overview/FuelDispensationOrderEdit.vue"
            ),
        props: true,
    },

    {
        name: "fuel-sheet",
        path: "/app/fuel-sheet",
        component: () =>
            import(
                /* webpackChunkName: "grid" */ "../view/apps/finance/fuel-sheet/FuelSheet.vue"
            ),
    },

    {
        name: "Expense",
        path: "/app/expense",
        component: () =>
            import(
                /* webpackChunkName: "grid" */ "../view/apps/finance/expense/Expense.vue"
            ),
    },

    {
        name: "ExpenseEdit",
        path: "/app/expense/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "grid" */ "../view/apps/finance/expense/overview/ExpenseEdit.vue"
            ),

            props: true
    },

    
    {
        name: "ExpenseView",
        path: "/app/expense/:id",
        component: () =>
            import(
                /* webpackChunkName: "grid" */ "../view/apps/finance/expense/overview/ExpenseView.vue"
            ),

            props: true
    },

    {
        name: "Bill",
        path: "/app/bills",
        component: () =>
            import(
                /* webpackChunkName: "grid" */ "../view/apps/finance/bill/Bill.vue"
            ),
    },

    {
        name: "BillView",
        path: "/app/bills/:id",
        component: () =>
            import(
                /* webpackChunkName: "grid" */ "../view/apps/finance/bill/overview/BillView.vue"
            ),

            props: true
    },



    {
        name: "JobCard",
        path: "/app/job-card",
        component: () =>
            import(
                /* webpackChunkName: "job-card" */ "../view/apps/finance/job-card/JobCard.vue"
            ),
    },
    {
        name: "JobCardCreate",
        path: "/app/job-card/create",
        component: () =>
            import(
                /* webpackChunkName: "job-card-create" */ "../view/apps/finance/job-card/overview/JobCardCreate.vue"
            ),

        props: true
    },

    {
        name: "JobCardView",
        path: "/app/job-card/:id",
        component: () =>
            import(
                /* webpackChunkName: "job-card-view" */ "../view/apps/finance/job-card/overview/JobCardView.vue"
            ),

        props: true
    },

    {
        name: "JobCardEdit",
        path: "/app/job-card/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "job-card-edit" */ "../view/apps/finance/job-card/overview/JobCardEdit.vue"
            ),
        props: true
    },

    {
        path: "/app/clients",
        name: "Client",
        component: () =>
            import(
                /* webpackChunkName: "client" */ "../view/apps/sales/client/Client.vue"
            ),
    },

    {
        name: "ClientView",
        path: "/app/clients/:id",
        component: () =>
            import(
                /* webpackChunkName: "client-view" */ "../view/apps/sales/client/overview/ClientView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "ClientEdit",
        path: "/app/clients/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "client-edit" */ "../view/apps/sales/client/overview/ClientEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        path: "/app/client-locations",
        name: "ClientDestination",
        component: () =>
            import(
                /* webpackChunkName: "destination" */ "../view/apps/sales/client-destination/ClientDestination.vue"
            ),
    },

    {
        name: "ClientDestinationView",
        path: "/app/client-locations/:id",
        component: () =>
            import(
                /* webpackChunkName: "destination-view" */ "../view/apps/sales/client-destination/overview/ClientDestinationView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "ClientDestinationEdit",
        path: "/app/client-locations/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "destination-edit" */ "../view/apps/sales/client-destination/overview/ClientDestinationEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },
    {
        path: "/app/invoices",
        name: "Invoice",
        component: () =>
            import(
                /* webpackChunkName: "invoice" */ "../view/apps/sales/invoice-sales-order/Invoice.vue"
            ),
    },

    {
        name: "InvoiceView",
        path: "/app/invoices/:id",
        component: () =>
            import(
                /* webpackChunkName: "invoice-view" */ "../view/apps/sales/invoice-sales-order/overview/InvoiceView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "InvoiceEdit",
        path: "/app/invoices/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "invoice-edit" */ "../view/apps/sales/invoice-sales-order/overview/InvoiceEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "InvoiceCreate",
        path: "/app/invoices/create",
        component: () =>
            import(
                /* webpackChunkName: "invoice-edit" */ "../view/apps/sales/invoice-sales-order/overview/InvoiceCreate.vue"
            ),
        
    },

    {
        path: "/app/sales-orders",
        name: "SalesOrder",
        component: () =>
            import(
                /* webpackChunkName: "invoice" */ "../view/apps/sales/invoice-sales-order/SalesOrder.vue"
            ),
    },

    {
        name: "SalesOrderEdit",
        path: "/app/sales-orders/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "order_edit" */ "../view/apps/sales/invoice-sales-order/overview/SalesOrderEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "SalesOrderView",
        path: "/app/sales-orders/:id",
        component: () =>
            import(
                /* webpackChunkName: "order_edit" */ "../view/apps/sales/invoice-sales-order/overview/SalesOrderView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        path: "/app/delivery-note",
        name: "DeliveryNote",
        component: () =>
            import(
                /* webpackChunkName: "blog3" */ "../view/apps/sales/delivery-note/DeliveryNote.vue"
            ),
    },

    {
        name: "DeliveryNoteView",
        path: "/app/delivery-note/:id",
        component: () =>
            import(
                /* webpackChunkName: "delivery-view" */ "../view/apps/sales/delivery-note/overview/DeliveryNoteView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "DeliveryNoteEdit",
        path: "/app/delivery-note/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "delivery-edit" */ "../view/apps/sales/delivery-note/overview/DeliveryNoteEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "DeliveryNoteCreate",
        path: "/app/delivery-note/create",
        component: () =>
            import(
                /* webpackChunkName: "delivery-create" */ "../view/apps/sales/delivery-note/overview/DeliveryNoteCreate.vue"
            ),
        
    },

    

    {
        path: "/app/credit-note",
        name: "CreditNote",
        component: () =>
            import(
                /* webpackChunkName: "CreditNote */ "../view/apps/sales/credit-note/CreditNote.vue"
            ),
        props: true,
    },

    {
        path: "/app/credit-note/:id",
        name: "CreditNoteView",
        component: () =>
            import(
                /* webpackChunkName: "credit-note-view" */ "../view/apps/sales/credit-note/overview/CreditNoteView.vue"
            ),
        props: true,
    },

    {
        path: "/app/credit-note/edit/:id",
        name: "CreditNoteEdit",
        component: () =>
            import(
                /* webpackChunkName: "credit-note-edit" */ "../view/apps/sales/credit-note/overview/CreditNoteEdit.vue"
            ),

        props: true,
    },

    {
        path: "/app/driver-complaint",
        name: "driver-complaint",
        component: () =>
            import(
                /* webpackChunkName: "blog2" */ "../view/apps/compliance/driver-complaint/DriverComplaint.vue"
            ),
    },
    {
        path: "/app/driver-achievement",
        name: "driver-achievement",
        component: () =>
            import(
                /* webpackChunkName: "blog3" */ "../view/apps/compliance/driver-achievement/DriverAchievement.vue"
            ),
    },

    // {
    //   name: "add-product",
    //   path: "ecommerce/add-product",
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "addProduct" */ "../view/apps/ecommerce/product/AddProduct.vue"
    //     ),
    // },
    // {
    //   name: "edit-product",
    //   path: "ecommerce/edit-product",
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "editProduct" */ "../view/apps/ecommerce/product/EditProduct.vue"
    //     ),
    // },
    // {
    //   name: "orders",
    //   path: "ecommerce/orders",
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "Orders" */ "../view/apps/ecommerce/Orders.vue"
    //     ),
    // },
    // {
    //   name: "sellers",
    //   path: "ecommerce/sellers",
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "sellers" */ "../view/apps/ecommerce/Sellers.vue"
    //     ),
    // },
    // {
    //   name: "invoice",
    //   path: "ecommerce/invoice",
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "invoice" */ "../view/apps/ecommerce/Invoice.vue"
    //     ),
    // },
    // {
    //   name: "cart",
    //   path: "ecommerce/cart",
    //   component: () =>
    //     import(/* webpackChunkName: "cart" */ "../view/apps/ecommerce/Cart.vue"),
    //   children: [
    //     {
    //       name: "exact",
    //       path: "",
    //       components: {
    //         default: () =>
    //           import(
    //             /* webpackChunkName: "cart" */ "../view/apps/ecommerce/Cart.vue"
    //           ),
    //         child: () =>
    //           import(
    //             /* webpackChunkName: "cartTable" */ "../view/apps/ecommerce/overview/CartTable.vue"
    //           ),
    //       },
    //     },
    //     {
    //       name: "checkout",
    //       path: "checkout",
    //       components: {
    //         default: () =>
    //           import(
    //             /* webpackChunkName: "cart" */ "../view/apps/ecommerce/Cart.vue"
    //           ),
    //         child: () =>
    //           import(
    //             /* webpackChunkName: "checkout" */ "../view/apps/ecommerce/overview/CheckOut.vue"
    //           ),
    //       },
    //     },
    //   ],
    // },

    {
        name: "social",
        path: "/app/social/profile",
        component: () =>
            import(
                /* webpackChunkName: "socialProfile" */ "../view/apps/myProfile/Index.vue"
            ),
        children: [
            {
                path: "overview",
                name: "overview",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "socialProfile" */ "../view/apps/myProfile/Index.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "overview" */ "../view/apps/myProfile/overview/Overview.vue"
                        ),
                },
            },
            {
                path: "timeline",
                name: "timeline",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "socialProfile" */ "../view/apps/myProfile/Index.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "timeline" */ "../view/apps/myProfile/overview/Timeline.vue"
                        ),
                },
            },
            {
                path: "activity",
                name: "activity",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "socialProfile" */ "../view/apps/myProfile/Index.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "activity" */ "../view/apps/myProfile/overview/Activity.vue"
                        ),
                },
            },
        ],
    },
    {
        name: "project",
        path: "/app/project",
        component: () =>
            import(
                /* webpackChunkName: "project" */ "../view/apps/project/Project.vue"
            ),
        children: [
            {
                path: "project-grid",
                name: "project-grid",
                component: () =>
                    import(
                        /* webpackChunkName: "project-grid" */ "../view/apps/project/overview/Grid.vue"
                    ),
            },
            {
                path: "project-list",
                name: "project-list",
                component: () =>
                    import(
                        /* webpackChunkName: "project-list" */ "../view/apps/project/overview/List.vue"
                    ),
            },
        ],
    },
    {
        name: "createProject",
        path: "/app/createProject",
        component: () =>
            import(
                /* webpackChunkName: "createProject" */ "../view/apps/project/CreateProject.vue"
            ),
        children: [
            {
                path: "create-grid",
                name: "create-grid",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "project" */ "../view/apps/project/CreateProject.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "grid" */ "../view/apps/project/overview/Grid.vue"
                        ),
                },
            },
        ],
    },
    {
        name: "projectDetails",
        path: "/app/project/projectDetails/:id",
        component: () =>
            import(
                /* webpackChunkName: "projectDetail" */ "../view/apps/project/ProjectDetails.vue"
            ),
        children: [
            {
                path: "",
                name: "",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "projectDetail" */ "../view/apps/project/ProjectDetails.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "tasklist" */ "../view/apps/project/overview/TaskList.vue"
                        ),
                },
            },
            {
                path: "tasklist",
                name: "tasklist",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "projectDetail" */ "../view/apps/project/ProjectDetails.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "tasklist" */ "../view/apps/project/overview/TaskList.vue"
                        ),
                },
            },
            {
                path: "activities",
                name: "activities",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "projectDetail" */ "../view/apps/project/ProjectDetails.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "activities" */ "../view/apps/project/overview/Activities.vue"
                        ),
                },
            },
        ],
    },
    {
        name: "calendar",
        path: "/app/calendar",
        component: () =>
            import(
                /* webpackChunkName: "calendar" */ "../view/apps/calendar/Calendar.vue"
            ),
        children: [
            {
                name: "year",
                path: "year",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "calendar" */ "../view/apps/calendar/Calendar.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "year" */ "../view/apps/calendar/overview/Year.vue"
                        ),
                },
            },
            {
                name: "month",
                path: "month",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "calendar" */ "../view/apps/calendar/Calendar.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "month" */ "../view/apps/calendar/overview/Month.vue"
                        ),
                },
            },
            {
                name: "week",
                path: "week",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "calendar" */ "../view/apps/calendar/Calendar.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "week" */ "../view/apps/calendar/overview/Week.vue"
                        ),
                },
            },
            {
                name: "day",
                path: "day",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "calendar" */ "../view/apps/calendar/Calendar.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "day" */ "../view/apps/calendar/overview/Day.vue"
                        ),
                },
            },
            {
                name: "schedule",
                path: "schedule",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "calendar" */ "../view/apps/calendar/Calendar.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "schedule" */ "../view/apps/calendar/overview/Schedule.vue"
                        ),
                },
            },
        ],
    },

    {
        name: "drivers",
        path: "/app/drivers",
        component: () =>
            import(
                /* webpackChunkName: "drivers" */ "../view/apps/operations/driver/Driver.vue"
            ),
    },

    {
        name: "DriverView",
        path: "/app/drivers/:id",
        component: () =>
            import(
                /* webpackChunkName: "driver-view" */ "../view/apps/operations/driver/overview/DriverView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "DriverEdit",
        path: "/app/drivers/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "driver-edit" */ "../view/apps/operations/driver/overview/DriverEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        path: "/app/vehicle-brands",
        name: "vehicle-brands",
        component: () =>
            import(
                /* webpackChunkName: "vehicle-brands" */ "../view/apps/operations/vehicle-brand/VehicleBrand.vue"
            ),
    },

    {
        name: "VehicleBrandView",
        path: "/app/vehicle-brands/:id",
        component: () =>
            import(
                /* webpackChunkName: "vehicle-brand-view" */ "../view/apps/operations/vehicle-brand/overview/VehicleBrandView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "VehicleBrandEdit",
        path: "/app/vehicle-brands/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "vehicle-brand-edit" */ "../view/apps/operations/vehicle-brand/overview/VehicleBrandEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        path: "/app/insurers",
        name: "insurers",
        component: () =>
            import(
                /* webpackChunkName: "insurers" */ "../view/apps/operations/insurer/Insurer.vue"
            ),
    },

    {
        name: "InsurerView",
        path: "/app/insurers/:id",
        component: () =>
            import(
                /* webpackChunkName: "insurer-view" */ "../view/apps/operations/insurer/overview/InsurerView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "InsurerEdit",
        path: "/app/insurers/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "insurer-edit" */ "../view/apps/operations/insurer/overview/InsurerEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        path: "/app/vendors",
        name: "Vendors",
        component: () =>
            import(
                /* webpackChunkName: "vendors" */ "../view/apps/operations/vendor/Vendor.vue"
            ),
    },

    {
        name: "VendorView",
        path: "/app/vendors/:id",
        component: () =>
            import(
                /* webpackChunkName: "vendor-view" */ "../view/apps/operations/vendor/overview/VendorView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "VendorEdit",
        path: "/app/vendors/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "vendor-edit" */ "../view/apps/operations/vendor/overview/VendorEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        path: "/app/vehicle-insurances",
        name: "vehicle-insurances",
        component: () =>
            import(
                /* webpackChunkName: "vehicle-insurer" */ "../view/apps/operations/vehicle-insurance/VehicleInsurance.vue"
            ),
    },

    {
        name: "VehicleInsuranceView",
        path: "/app/vehicle-insurances/:id",
        component: () =>
            import(
                /* webpackChunkName: "vehicle-insurance-view" */ "../view/apps/operations/vehicle-insurance/overview/VehicleInsuranceView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "VehicleInsurerEdit",
        path: "/app/vehicle-insurances/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "vehicle-insurance-edit" */ "../view/apps/operations/vehicle-insurance/overview/VehicleInsuranceEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        path: "/app/vehicles",
        name: "vehicles",
        component: () =>
            import(
                /* webpackChunkName: "vehicle" */ "../view/apps/operations/vehicle/Vehicle.vue"
            ),
    },

    {
        name: "VehicleView",
        path: "/app/vehicles/:id",
        component: () =>
            import(
                /* webpackChunkName: "vehicle-view" */ "../view/apps/operations/vehicle/overview/VehicleView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "VehicleEdit",
        path: "/app/vehicles/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "vehicle-edit" */ "../view/apps/operations/vehicle/overview/VehicleEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        path: "/app/suppliers",
        name: "suppliers",
        component: () =>
            import(
                /* webpackChunkName: "supplier" */ "../view/apps/operations/supplier/Supplier.vue"
            ),
    },

    {
        name: "SupplierView",
        path: "/app/suppliers/:id",
        component: () =>
            import(
                /* webpackChunkName: "supplier-view" */ "../view/apps/operations/supplier/overview/SupplierView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "SupplierCreateBill",
        path: "/app/suppliers/create-bill/:id",
        component: () =>
            import(
                /* webpackChunkName: "supplier-view" */ "../view/apps/operations/supplier/overview/SupplierCreateBill.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "SupplierEdit",
        path: "/app/suppliers/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "supplier-edit" */ "../view/apps/operations/supplier/overview/SupplierEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        path: "/app/products",
        name: "product",
        component: () =>
            import(
                /* webpackChunkName: "product" */ "../view/apps/operations/product/Product.vue"
            ),
    },

    {
        name: "ProductView",
        path: "/app/products/:id",
        component: () =>
            import(
                /* webpackChunkName: "product-view" */ "../view/apps/operations/product/overview/ProductView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "ProductEdit",
        path: "/app/products/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "product-edit" */ "../view/apps/operations/product/overview/ProductEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        path: "/app/trips",
        name: "Trip",
        component: () =>
            import(
                /* webpackChunkName: "Trip" */ "../view/apps/operations/trip/Trip.vue"
            ),
    },

    {
        name: "TripView",
        path: "/app/trips/:id",
        component: () =>
            import(
                /* webpackChunkName: "trip-view" */ "../view/apps/operations/trip/overview/TripView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "TripEdit",
        path: "/app/trips/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "trip-view" */ "../view/apps/operations/trip/overview/TripEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        path: "/app/trips/create",
        name: "TripCreate",
        component: () =>
            import(
                /* webpackChunkName: "TripCreate" */ "../view/apps/operations/trip/overview/TripCreate.vue"
            ),
    },

    {
        path: "/app/units-of-measures",
        name: "measurement",
        component: () =>
            import(
                /* webpackChunkName: "product-of-measure" */ "../view/apps/operations/product/UnitOfMeasurement.vue"
            ),
    },

    {
        name: "UnitOfMeasureView",
        path: "/app/units-of-measures/:id",
        component: () =>
            import(
                /* webpackChunkName: "vehicle-view" */ "../view/apps/operations/product/overview/UnitOfMeasureView.vue"
            ),
        props: true, // Enable passing route params as props
    },

    {
        name: "UnitOfMeasureEdit",
        path: "/app/units-of-measures/edit/:id",
        component: () =>
            import(
                /* webpackChunkName: "vehicle-brand-edit" */ "../view/apps/operations/product/overview/UnitOfMeasureEdit.vue"
            ),
        props: true, // Enable passing route params as props
    },

    // {
    //   path: "social",
    //   name: "social-note",
    //   components: {
    //     default: () =>
    //       import(/* webpackChunkName: "note" */ "../view/apps/note/Note.vue"),
    //     child: () =>
    //       import(
    //         /* webpackChunkName: "social-note" */ "../view/apps/note/overview/social.vue"
    //       ),
    //   },
    // },
    // {
    //   path: "important",
    //   name: "note-important",
    //   components: {
    //     default: () =>
    //       import(/* webpackChunkName: "note" */ "../view/apps/note/Note.vue"),
    //     child: () =>
    //       import(
    //         /* webpackChunkName: "important" */ "../view/apps/note/overview/important.vue"
    //       ),
    //   },
    // },

    {
        path: "/app/users/roles/edit/:id",
        name: "UserTableEdit",
        component: () =>
        import(
            /* webpackChunkName: "usertableEdit" */ "../view/apps/users/overview/UserTableEdit.vue"
        ),
        props: true,
    },
    {
        path: "/app/users/roles/:id",
        name: "UserTableView",
        component: () =>
        import(
            /* webpackChunkName: "usertableEdit" */ "../view/apps/users/overview/UserTableView.vue"
        ),
        props: true,
    },

    {
        name: "users",
        path: "/app/users",
        component: () =>
            import(
                /* webpackChunkName: "users" */ "../view/apps/users/Index.vue"
            ),
        children: [
            {
                path: "dataTable",
                name: "dataTable",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "users" */ "../view/apps/users/Index.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "dataTable" */ "../view/apps/users/UserListDataTable.vue"
                        ),
                },
            },
            {
                path: "team",
                name: "team",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "users" */ "../view/apps/users/Index.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "team" */ "../view/apps/users/Team.vue"
                        ),
                },
            },

            {
                path: "roles",
                name: "roles",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "users" */ "../view/apps/users/Index.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "user-grid" */ "../view/apps/users/UserListDataTable.vue"
                        ),
                },
            },
            
            {
                path: "users",
                name: "users-1",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "users" */ "../view/apps/users/Index.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "users-1" */ "../view/apps/users/Users.vue"
                        ),
                },
                children: [
                    {
                        path: "user-list",
                        name: "user-list",
                        components: {
                            default: () =>
                                import(
                                    /* webpackChunkName: "users" */ "../view/apps/users/Index.vue"
                                ),
                            descendant: () =>
                                import(
                                    /* webpackChunkName: "user-list" */ "../view/apps/users/overview/UserCardList.vue"
                                ),
                        },
                    },
                    {
                        path: "grid-style",
                        name: "grid-style",
                        components: {
                            default: () =>
                                import(
                                    /* webpackChunkName: "users" */ "../view/apps/users/Index.vue"
                                ),
                            descendant: () =>
                                import(
                                    /* webpackChunkName: "user-style" */ "../view/apps/users/overview/UserCardStyle.vue"
                                ),
                        },
                    },
                    {
                        path: "grid-group",
                        name: "grid-group",
                        components: {
                            default: () =>
                                import(
                                    /* webpackChunkName: "users" */ "../view/apps/users/Index.vue"
                                ),
                            descendant: () =>
                                import(
                                    /* webpackChunkName: "user-group" */ "../view/apps/users/overview/UserCardGroup.vue"
                                ),
                        },
                    },
                ],
            },
            {
                path: "add-user",
                name: "add-user",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "users" */ "../view/apps/users/Index.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "addUser" */ "../view/apps/users/AddUsers.vue"
                        ),
                },
                children: [
                    {
                        path: "info",
                        name: "info",
                        components: {
                            default: () =>
                                import(
                                    /* webpackChunkName: "users" */ "../view/apps/users/Index.vue"
                                ),
                            descendant: () =>
                                import(
                                    /* webpackChunkName: "info" */ "../view/apps/users/overview/Info.vue"
                                ),
                        },
                    },
                    {
                        path: "work",
                        name: "work",
                        components: {
                            default: () =>
                                import(
                                    /* webpackChunkName: "users" */ "../view/apps/users/Index.vue"
                                ),
                            descendant: () =>
                                import(
                                    /* webpackChunkName: "work" */ "../view/apps/users/overview/work.vue"
                                ),
                        },
                    },
                    {
                        path: "social",
                        name: "social-user",
                        components: {
                            default: () =>
                                import(
                                    /* webpackChunkName: "users" */ "../view/apps/users/Index.vue"
                                ),
                            descendant: () =>
                                import(
                                    /* webpackChunkName: "social-user" */ "../view/apps/users/overview/Social.vue"
                                ),
                        },
                    },
                ],
            },
        ],
    },
    {
        name: "contact",
        path: "/app/contact",
        component: () =>
            import(
                /* webpackChunkName: "contact-grid" */ "../view/apps/contact/Index.vue"
            ),
        children: [
            {
                name: "contact-grid",
                path: "contact-grid",
                component: () =>
                    import(
                        /* webpackChunkName: "contact-grid" */ "../view/apps/contact/ContactGrid.vue"
                    ),
            },
            {
                name: "contact-list",
                path: "contact-list",
                component: () =>
                    import(
                        /* webpackChunkName: "contact-list" */ "../view/apps/contact/Contact.vue"
                    ),
            },
            {
                name: "contact-create",
                path: "contact-create",
                component: () =>
                    import(
                        /* webpackChunkName: "contact-create" */ "../view/apps/contact/ContactCreate.vue"
                    ),
            },
        ],
    },

    {
        name: "to-do",
        path: "/app/to-do",
        component: () =>
            import(
                /* webpackChunkName: "to-do" */ "../view/apps/todo/Todo.vue"
            ),
    },
    {
        name: "import-export",
        path: "/app",
        component: () =>
            import(
                /* webpackChunkName: "import" */ "../view/apps/importExport/Index.vue"
            ),
        children: [
            {
                name: "import",
                path: "import",
                component: () =>
                    import(
                        /* webpackChunkName: "import" */ "../view/apps/importExport/Import.vue"
                    ),
            },
            {
                name: "export",
                path: "export",
                component: () =>
                    import(
                        /* webpackChunkName: "export" */ "../view/apps/importExport/Export.vue"
                    ),
            },
        ],
    },

    {
        name: "task",
        path: "/app/task",
        component: () =>
            import(
                /* webpackChunkName: "task" */ "../view/apps/task/Index.vue"
            ),
        children: [
            {
                name: "all",
                path: "all",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "task" */ "../view/apps/task/Index.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "all" */ "../view/apps/task/overview/all.vue"
                        ),
                },
            },
            {
                name: "favorites",
                path: "favorites",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "task" */ "../view/apps/task/Index.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "favorites" */ "../view/apps/task/overview/favorites.vue"
                        ),
                },
            },
            {
                name: "completed",
                path: "completed",
                components: {
                    default: () =>
                        import(
                            /* webpackChunkName: "task" */ "../view/apps/task/Index.vue"
                        ),
                    child: () =>
                        import(
                            /* webpackChunkName: "completed" */ "../view/apps/task/overview/completed.vue"
                        ),
                },
            },
        ],
    },
    {
        name: "kanban",
        path: "/app/kanban",
        component: () =>
            import(
                /* webpackChunkName: "kanban" */ "../view/apps/kanban/Index.vue"
            ),
    },
    {
        name: "tickets",
        path: "/app/support/tickets",
        component: () =>
            import(
                /* webpackChunkName: "tickets" */ "../view/apps/supportTicket/SupportTicket.vue"
            ),
    },
    {
        name: "ticketDetails",
        path: "/app/support/ticketDetails/:id",
        component: () =>
            import(
                /* webpackChunkName: "ticketDetails" */ "../view/apps/supportTicket/SupportTicketDetails.vue"
            ),
    },
    {
        name: "learning",
        path: "/app/learning/course",
        component: () =>
            import(
                /* webpackChunkName: "course" */ "../view/apps/course/Course.vue"
            ),
    },
    {
        name: "courseDetails",
        path: "/app/learning/courseDetails/:id",
        component: () =>
            import(
                /* webpackChunkName: "course" */ "../view/apps/course/CourseDetails.vue"
            ),
    },
    {
        name: "jobSearch",
        path: "/app/jobSearch",
        component: () =>
            import(
                /* webpackChunkName: "jobSearch" */ "../view/apps/jobSearch/Jobs.vue"
            ),
        children: [
            {
                path: "grid",
                name: "grid",
                component: () =>
                    import(
                        /* webpackChunkName: "grid" */ "../view/apps/jobSearch/overview/Grid.vue"
                    ),
            },
            {
                path: "list",
                name: "list",
                component: () =>
                    import(
                        /* webpackChunkName: "list" */ "../view/apps/jobSearch/overview/List.vue"
                    ),
            },
        ],
    },
    {
        name: "jobDetails",
        path: "/app/jobDetails/:id",
        component: () =>
            import(
                /* webpackChunkName: "jobDetails" */ "../view/apps/jobSearch/JobSearchDetails.vue"
            ),
    },
    {
        name: "apply",
        path: "/app/job/apply",
        component: () =>
            import(
                /* webpackChunkName: "apply" */ "../view/apps/jobSearch/JobApplication.vue"
            ),
    },
];
