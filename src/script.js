import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/** Debug UI */
const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 *  Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Mesh
 */
// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture })
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// // material.transparent = true
// // material.opacity = 0.5
// material.side = THREE.DoubleSide

// MeshNormalMaterial
// const material = new THREE.MeshNormalMateria

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial()

// Meshphongmaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x3fbfff)

// MeshtoonMaterial
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture

// // MeshStandardmaterial
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.7
// material.roughness = 0.2
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.4
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.alphaMap = doorAlphaTexture
// material.transparent = false


// MeshPhysicalmaterial
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 1
material.roughness = 0
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.4
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.alphaMap = doorAlphaTexture
// material.transparent = false

// clearcoat
// material.clearcoat = 1
// material.clearcoatRoughness = 0.5

// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)

// Sheen
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor = new THREE.Color(#00ffff)

// gui.add(material,'sheen').min(0).max(1).step(0.0001)
// gui.add(material,'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(material,'sheenColor')

// iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1.5
// material.iridescenceThicknessRange = [ 100, 800 ]

gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
gui.add(material, 'iridescenceIOR').min(1).max(2.33).step(0.0001)
gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

// Transmission
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

// gui.add(material, 'transmission').min(0).max(1).step(0.0001)
// gui.add(material, 'ior').min(1).max(10).step(0.0001)
// gui.add(material, 'thickness').min(0).max(1).step(0.0001)

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
// gui.add(material, 'displacementScale').min(0).max(1).step(0.05)
// gui.add(material, 'transparent')


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry( 3, 64, 64 ),
    material
)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry( 4, 4, 100, 100 ),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry( 2.8, 1.2, 8, 55 ),
    material
)
scene.add(sphere, plane, torus)

sphere.position.x = -10

plane.position.x = 0

torus.position.x = 10

// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Environment Map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => 
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    scene.background = environmentMap
    scene.environment = environmentMap
})



// const sphereGeometry = new THREE.SphereGeometry( 3, 16, 16 )
// const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
// scene.add(sphere)

// sphere.position.x = -10

// const planeGeometry = new THREE.PlaneGeometry( 4, 4 )
// const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const plane = new THREE.Mesh(planeGeometry, planeMaterial)
// scene.add(plane)

// plane.position.x = 0

// const taurusGeometry = new THREE.TorusGeometry( 2.8, 1.2, 8, 55 )
// const taurusMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const taurus = new THREE.Mesh(taurusGeometry, taurusMaterial)
// scene.add(taurus)

// taurus.position.x = 10

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 8
camera.position.y = 3
camera.position.z = 15
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Update Objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = - 0.15 * elapsedTime
    plane.rotation.x = - 0.15 * elapsedTime
    torus.rotation.x = - 0.15 * elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()