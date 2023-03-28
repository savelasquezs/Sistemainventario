<template>
    <div>28 Octubre 2021 | 17:30</div>
    <div class="cont">
        <ul class="compras-ul">
            <li>Compras</li>
        </ul>
    </div>

    <div class="cotainer">
        <ul>
            <li class="productos">
                <div class="vender-producto">
                    <img src="../assets/img/toxiFondoBlanco.jpeg" alt="">
                </div>
                <div class="product">
                    <div class="nombre-producto">
                        <h5>Gorra Flex-Fit</h5>
                        <h6>$4.29</h6>
                    </div>
                    <div class="nombre-producto">
                        <Icon icon="ic:baseline-remove-circle" width="30" height="30" />
                        <h4>1</h4>
                        <Icon icon="material-symbols:add-circle-rounded" width="30" height="30" />
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
    export default {
        components: {
            Icon,
        },
    }
</script>

<style scoped lang="scss">


.compras-ul{
    display: flex;
    cursor: pointer;
    list-style-type: none;
}

.productos {
    display: flex;
}

.nombre-producto{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
}
.vender-producto{
    img {
        width: 140px;
    }
}


.product {
    display: grid;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;    
}

.remove-add {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;
    gap: 30px;
}

.nombre-producto {
    .h6 {
        text-align: right;
    }
}
</style>
