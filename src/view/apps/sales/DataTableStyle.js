import Styled from 'vue3-styled-components';

const DataTableStyleWrap = Styled.div`
    .ninjadash-datatable-filter{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 20px 0 25px 0;
        gap: 20px; 
        @media only screen and (max-width: 575px){
            flex-wrap: wrap;
        }
        .ninjadash-datatable-filter__left{
            display: inline-flex;
            flex: 1;
            align-items: center;
            margin-right: 20px; 
            .ant-input {
                width: 100%;
                height: auto;
                border-radius: 6px;
                padding: 0 15px;
            }
            .ant-input-prefix {
                margin-right: 10px;
            }
        }
        .ninjadash-datatable-filter__middle{
            display: inline-flex;
            flex: 1;
            align-items: center;
            margin-right: 20px; 
            .ant-select {
                width: 100%;
                .ant-select-selector {
                    height: 40px;
                    display: flex;
                    align-items: center;
                    padding: 0 15px;
                    border-radius: 6px;
                }
            }
        }
        .ninjadash-datatable-filter__right{
            display: inline-flex;
            justify-content: right
            flex: 1;
            align-items: right;
            .ant-picker {
                width: 100%;
                height: 40px;
                border-radius: 6px;
                padding: 0 15px;
            }
        }
    }
`;
export { DataTableStyleWrap };
