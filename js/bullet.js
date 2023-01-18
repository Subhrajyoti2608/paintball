AFRAME.registerComponent("bullet",{
    init: function(){
        this.shootBullet()
    },
    shootBullet: function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key == "z"){
                var bullet = document.createElement("a-entity")
                bullet.setAttribute("geometry",{primitive:"sphere",radius:1}) 
                bullet.setAttribute("material",{color:"black"})

                var cam = document.querySelector("#camera")

                pos = cam.getAttribute("position")

                bullet.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z})

                var camera = document.querySelector("#camera").object3D

                var dir =  new THREE.Vector3()

                camera.getWorldDirection(dir)

                bullet.setAttribute("velocity",dir.multiplyScalar(-10))

                bullet.setAttribute("dynamic-body",{shape:"sphere",mass:0})

                bullet.addEventListener("collide",this.removeBullet)

                var scene = document.querySelector("#scene")

                scene.appendChild(bullet)


            }
        })
    },
    removeBullet: function(e){
        console.log(e.detail.target.el)

        console.log(e.detail.body.el)

        var element = e.detail.target.el

        var elementHit = e.detail.body.el

        if(elementHit.id.includes("plane")){
            elementHit.setAttribute("material",{opacity:0.6,transparent:true})

            var impulse = new CANNON.vec3(-2,2,1)

            var worldpoint = new CANNON.vec3().copy(elementHit.getAttribute("position"))

            elementHit.body.applyImpulse(impulse,worldpoint)

            element.removeEventListener("collide",this.shoot)

            var scene = document.querySelector("#scene")

            scene.removeChild(element)
        }
    },
    shootSound: function(){
        var entity = document.querySelector("#sound")
        entity.components.sound.playSound()
    }
})