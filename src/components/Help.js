const productos = [
    {id: '1'  , nombre: 'GUITARRA ACUSTICA EKO RANGER' ,precio: 1.999, categoria: "EKO" , marca: "EKO" , stock: 15, 
        fotos: [
        {idfoto: 1 , foto: 'https://productos.mjmusic.com.ar/images/000000RANGER12EQ92498RANGER12EQ.jpg'},
        {idfoto: 2 , foto: 'https://productos.mjmusic.com.ar/images/0000000RANGER6VI000294177RANGER6VI-6.jpg'}
    ]},
    {id: '2'  , nombre: 'GUITARRA AC EKO RANGER FOLK12c' , precio: 2.999, categoria: "EKO" , marca: "EKO" , stock: 17, fotos : [
        {idfoto: 1 , foto: 'https://productos.mjmusic.com.ar/images/000000RANGER12HB92041RANGER12HB.jpg'},
        {idfoto: 2 , foto: 'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/312/585/products/eko571-4b44129a40bc51298e16376260737523-640-0.jpg'}
    ]},
    {id: '3'  , nombre: 'GUITARRA ELEC DANELECTRO 59M' , precio: 3.999, categoria: "DANELECTRO" , marca: "DANELECTRO", stock: 25, fotos : [
        {idfoto: 1 , foto: 'https://productos.mjmusic.com.ar/images/000000059MNOSBLK2043859MNOSBLK.jpg'},
        {idfoto: 2 , foto: 'https://www.stringsfield.com/9395-medium_default/guitarra-electrica-danelectro-de-59m-nos-blk.jpg'}
    ]},
    {id: '4'  , nombre: 'BAJO ELECTRICO TOKAI' , precio: 3.999, categoria: "TOKAI" , marca: "TOKAI" , stock: 25, fotos : [
        {idfoto: 1 , foto: 'https://productos.mjmusic.com.ar/images/00000000APB52YSC75944apb52ysc.jpg'},
        {idfoto: 2 , foto: 'https://img.kytary.com/eshop_at/stredni_v4x/na/637401220496030000/175b2ef8/64796256/tokai-1981-jazz-sound.jpg'}
    ]},
    {id: '5'  , nombre: 'BAJO ELECTRICO LEONARD PARA ZURDOS' , precio: 3.999, categoria: "LEONARD" , marca: "LEONARD" , stock: 25, fotos : [
        {idfoto: 1 , foto: 'https://productos.mjmusic.com.ar/images/00000000LB255MRD29310lb255mrd-1.jpg'},
        {idfoto: 2 , foto: 'https://productos.mjmusic.com.ar/images/00000000LB255MRD000129304lb255mrd-2.jpg'}
    ]},
    {id: '6'  , nombre: 'BAJO ELECTRICO LEONARD PRECISION' , precio: 3.999, categoria: "LEONARD" , marca: "LEONARD" , stock: 25, fotos : [
        {idfoto: 1 , foto: 'https://productos.mjmusic.com.ar/images/000000000LB252WH69538lb252wh.jpg'},
        {idfoto: 2 , foto: 'https://productos.mjmusic.com.ar/images/000000000LB252WH000171663lb252wh-2.jpg'}
        
    ]},
    {id: '7'  , nombre: 'GUITARRA DANELECTRO CONV AC-ELEC' , precio: 3.999, categoria: "DANELECTRO" , marca: "DANELECTRO" , stock: 25, fotos : [
        {idfoto: 1 , foto: 'https://productos.mjmusic.com.ar/images/000000000CONVCRM20755CONVCRM.jpg'},
        {idfoto: 2 , foto: 'https://productos.mjmusic.com.ar/images/000000000CONVBLK20785CONVBLK.jpg'}
    
    ]},
    {id: '8'  , nombre: 'GUITARRA ELÉCTRICA STAGG LES PAUL' , precio: 3.999, categoria: "STAGG" , marca: "STAGG" , stock: 25, fotos : [
        {idfoto: 1 , foto: 'https://productos.mjmusic.com.ar/images/0000000000L400TS15688L400TS.png'},
        {idfoto: 2 , foto: 'https://productos.mjmusic.com.ar/images/0000000000L400WH15738L400WH.png'}

    ]},
    {id: '9'  , nombre: 'GUITARRA ELEC STAGG SILVERAY & RED' , precio: 3.999, categoria: "STAGG" , marca: "STAGG" , stock: 25, fotos : [
        {idfoto: 1 , foto: 'https://productos.mjmusic.com.ar/images/00000000SVYCSTBK14790SVYCSTBK.png'},
        {idfoto: 2 , foto: 'https://productos.mjmusic.com.ar/images/000SVYCSTDLXFRED14758SVYCSTDLXFRED.png'}
    ]},
    {id: '10'  , nombre: 'GUITARRA ELEC STAGG TELECASTER' , precio: 3.999, categoria: "STAGG" , marca: "STAGG" , stock: 25, fotos : [
        {idfoto: 1 , foto: 'https://productos.mjmusic.com.ar/images/00000000SETCSTYW15336SETCSTYW.png'},
        {idfoto: 2 , foto: 'https://productos.mjmusic.com.ar/images/0000000SETCSTSNB15285SETCSTSNB.png'}
    ]},
    {id: '11' , nombre: 'GUITARRA ELECTRICA TOKAI TIPO 335' , precio: 3.999, categoria: "TOKAI" , marca: "TOKAI" , stock: 25, fotos : [
        {idfoto: 1 , foto: 'https://productos.mjmusic.com.ar/images/0000000000ES73SR08219ES73.jpg'},
        {idfoto: 2 , foto: 'https://m.media-amazon.com/images/I/61lPgsD544L._AC_SX450_.jpg'}
    ]},
    {id: '12' , nombre: 'GUITARRA ELECTRICA TOKAI LES PAUL' , precio: 3.999, categoria: "TOKAI" , marca: "TOKAI" , stock: 25, fotos : [
        {idfoto: 1 , foto: 'https://productos.mjmusic.com.ar/images/00000000ALS55PVF49420als55pvf.jpg'},
        {idfoto: 2 , foto: 'https://http2.mlstatic.com/D_NQ_NP_913663-MLA40762430475_022020-O.jpg'}
    ]}
]
 

const GetPage = new Promise( (resolve, reject) => {
  let url = 'instrumentalsantafe.com'
  
    if (url === 'instrumentalsantafe.com'){
        setTimeout(() => {
            resolve(productos)
        },3000 )
    }else{
        reject('404 not found')
    }
}
)

export default GetPage;