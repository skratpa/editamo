function convert(gltfModel) {
    if(gltfModel.animations == undefined) {
        loadForOBJ(gltfModel);
    } else {
        loadForAMO(gltfModel);
    }
};

function loadForOBJ(gltfModel) {
    let vertexBuffer = {};
    vertexBuffer.accessor = gltfModel.meshes[0].primitives[0].attributes.POSITION;
    vertexBuffer.bufferView = gltfModel.accessors[vertexBuffer.accessor].bufferView;
    vertexBuffer.count = gltfModel.accessors[vertexBuffer.accessor].count;
    vertexBuffer.buffer = gltfModel.bufferViews[vertexBuffer.bufferView].buffer;
    vertexBuffer.start = gltfModel.bufferViews[vertexBuffer.bufferView].byteOffset;
    vertexBuffer.stop = vertexBuffer.start + gltfModel.bufferViews[vertexBuffer.bufferView].byteLength;

    let normalBuffer = {};
    normalBuffer.accessor = gltfModel.meshes[0].primitives[0].attributes.NORMAL;
    normalBuffer.bufferView = gltfModel.accessors[normalBuffer.accessor].bufferView;
    normalBuffer.count = gltfModel.accessors[normalBuffer.accessor].count;
    normalBuffer.buffer = gltfModel.bufferViews[normalBuffer.bufferView].buffer;
    normalBuffer.start = gltfModel.bufferViews[normalBuffer.bufferView].byteOffset;
    normalBuffer.stop = normalBuffer.start + gltfModel.bufferViews[normalBuffer.bufferView].byteLength;

    let uvBuffer = {};
    uvBuffer.accessor = gltfModel.meshes[0].primitives[0].attributes.TEXCOORD_0;
    uvBuffer.bufferView = gltfModel.accessors[uvBuffer.accessor].bufferView;
    uvBuffer.count = gltfModel.accessors[uvBuffer.accessor].count;
    uvBuffer.buffer = gltfModel.bufferViews[uvBuffer.bufferView].buffer;
    uvBuffer.start = gltfModel.bufferViews[uvBuffer.bufferView].byteOffset;
    uvBuffer.stop = uvBuffer.start + gltfModel.bufferViews[uvBuffer.bufferView].byteLength;

    let indexBuffer = {};
    indexBuffer.accessor = gltfModel.meshes[0].primitives[0].indices;
    indexBuffer.bufferView = gltfModel.accessors[indexBuffer.accessor].bufferView;
    indexBuffer.count = gltfModel.accessors[indexBuffer.accessor].count;
    indexBuffer.buffer = gltfModel.bufferViews[indexBuffer.bufferView].buffer;
    indexBuffer.start = gltfModel.bufferViews[indexBuffer.bufferView].byteOffset;
    indexBuffer.stop = indexBuffer.start + gltfModel.bufferViews[indexBuffer.bufferView].byteLength;

    for(let i = 0; i < gltfModel.buffers.length; i++) {
        fetch(gltfModel.buffers[i].uri).then((res) => {
            res.arrayBuffer().then((data) => {
                if(vertexBuffer.buffer == i) {
                    vertexBuffer.data = new Float32Array(data.slice(vertexBuffer.start, vertexBuffer.stop));
                }
                if(normalBuffer.buffer == i) {
                    normalBuffer.data = new Float32Array(data.slice(normalBuffer.start, normalBuffer.stop));
                }
                if(uvBuffer.buffer == i) {
                    uvBuffer.data = new Float32Array(data.slice(uvBuffer.start, uvBuffer.stop));
                }
                if(indexBuffer.buffer == i) {
                    indexBuffer.data = new Uint16Array(data.slice(indexBuffer.start, indexBuffer.stop));
                }
                console.log(createOBJ(gltfModel, vertexBuffer, normalBuffer, uvBuffer, indexBuffer));
            });
        });
    }
}

function loadForAMO(gltfModel) {
    let vertexBuffer = {};
    vertexBuffer.accessor = gltfModel.meshes[0].primitives[0].attributes.POSITION;
    vertexBuffer.bufferView = gltfModel.accessors[vertexBuffer.accessor].bufferView;
    vertexBuffer.count = gltfModel.accessors[vertexBuffer.accessor].count;
    vertexBuffer.buffer = gltfModel.bufferViews[vertexBuffer.bufferView].buffer;
    vertexBuffer.start = gltfModel.bufferViews[vertexBuffer.bufferView].byteOffset;
    vertexBuffer.stop = vertexBuffer.start + gltfModel.bufferViews[vertexBuffer.bufferView].byteLength;

    let normalBuffer = {};
    normalBuffer.accessor = gltfModel.meshes[0].primitives[0].attributes.NORMAL;
    normalBuffer.bufferView = gltfModel.accessors[normalBuffer.accessor].bufferView;
    normalBuffer.count = gltfModel.accessors[normalBuffer.accessor].count;
    normalBuffer.buffer = gltfModel.bufferViews[normalBuffer.bufferView].buffer;
    normalBuffer.start = gltfModel.bufferViews[normalBuffer.bufferView].byteOffset;
    normalBuffer.stop = normalBuffer.start + gltfModel.bufferViews[normalBuffer.bufferView].byteLength;

    let uvBuffer = {};
    uvBuffer.accessor = gltfModel.meshes[0].primitives[0].attributes.TEXCOORD_0;
    uvBuffer.bufferView = gltfModel.accessors[uvBuffer.accessor].bufferView;
    uvBuffer.count = gltfModel.accessors[uvBuffer.accessor].count;
    uvBuffer.buffer = gltfModel.bufferViews[uvBuffer.bufferView].buffer;
    uvBuffer.start = gltfModel.bufferViews[uvBuffer.bufferView].byteOffset;
    uvBuffer.stop = uvBuffer.start + gltfModel.bufferViews[uvBuffer.bufferView].byteLength;

    let indexBuffer = {};
    indexBuffer.accessor = gltfModel.meshes[0].primitives[0].indices;
    indexBuffer.bufferView = gltfModel.accessors[indexBuffer.accessor].bufferView;
    indexBuffer.count = gltfModel.accessors[indexBuffer.accessor].count;
    indexBuffer.buffer = gltfModel.bufferViews[indexBuffer.bufferView].buffer;
    indexBuffer.start = gltfModel.bufferViews[indexBuffer.bufferView].byteOffset;
    indexBuffer.stop = indexBuffer.start + gltfModel.bufferViews[indexBuffer.bufferView].byteLength;

    let jointBuffer = {};
    jointBuffer.accessor = gltfModel.meshes[0].primitives[0].attributes.JOINTS_0;
    jointBuffer.bufferView = gltfModel.accessors[jointBuffer.accessor].bufferView;
    jointBuffer.count = gltfModel.accessors[jointBuffer.accessor].count;
    jointBuffer.buffer = gltfModel.bufferViews[jointBuffer.bufferView].buffer;
    jointBuffer.start = gltfModel.bufferViews[jointBuffer.bufferView].byteOffset;
    jointBuffer.stop = jointBuffer.start + gltfModel.bufferViews[jointBuffer.bufferView].byteLength;

    let weightBuffer = {};
    weightBuffer.accessor = gltfModel.meshes[0].primitives[0].attributes.WEIGHTS_0;
    weightBuffer.bufferView = gltfModel.accessors[weightBuffer.accessor].bufferView;
    weightBuffer.count = gltfModel.accessors[weightBuffer.accessor].count;
    weightBuffer.buffer = gltfModel.bufferViews[weightBuffer.bufferView].buffer;
    weightBuffer.start = gltfModel.bufferViews[weightBuffer.bufferView].byteOffset;
    weightBuffer.stop = weightBuffer.start + gltfModel.bufferViews[weightBuffer.bufferView].byteLength;

    let animation = {};
    animation.name = gltfModel.animations[0].name;
    animation.joints = [];
    for(let i = 0; i < gltfModel.skins[0].joints.length; i++) {
        animation.joints[i] = {};
        animation.joints[i].index = gltfModel.skins[0].joints[i];
        animation.joints[i].name = gltfModel.nodes[animation.joints[i].index].name;
        animation.joints[i].children = gltfModel.nodes[animation.joints[i].index].children;
        if(animation.joints[i].children != undefined) {
            for(let j = 0; j < animation.joints[i].children.length; j++) {
                animation.joints[animation.joints[i].children[j]].parent = i; 
            }
        }
    }
    animation.samplers = [];
    for(let i = 0; i < gltfModel.animations[0].samplers.length; i++) {
        animation.samplers[i] = {};
        animation.samplers[i].timeBuffer = {};
        animation.samplers[i].timeBuffer.accessor = gltfModel.animations[0].samplers[i].input;
        animation.samplers[i].timeBuffer.bufferView = gltfModel.accessors[animation.samplers[i].timeBuffer.accessor].bufferView;
        animation.samplers[i].timeBuffer.count = gltfModel.accessors[animation.samplers[i].timeBuffer.accessor].count;
        animation.samplers[i].timeBuffer.buffer = gltfModel.bufferViews[animation.samplers[i].timeBuffer.bufferView].buffer;
        animation.samplers[i].timeBuffer.start = gltfModel.bufferViews[animation.samplers[i].timeBuffer.bufferView].byteOffset;
        animation.samplers[i].timeBuffer.stop = animation.samplers[i].timeBuffer.start + gltfModel.bufferViews[animation.samplers[i].timeBuffer.bufferView].byteLength;

        animation.samplers[i].valueBuffer = {};
        animation.samplers[i].valueBuffer.accessor = gltfModel.animations[0].samplers[i].output;
        animation.samplers[i].valueBuffer.bufferView = gltfModel.accessors[animation.samplers[i].valueBuffer.accessor].bufferView;
        animation.samplers[i].valueBuffer.count = gltfModel.accessors[animation.samplers[i].valueBuffer.accessor].count;
        animation.samplers[i].valueBuffer.buffer = gltfModel.bufferViews[animation.samplers[i].valueBuffer.bufferView].buffer;
        animation.samplers[i].valueBuffer.start = gltfModel.bufferViews[animation.samplers[i].valueBuffer.bufferView].byteOffset;
        animation.samplers[i].valueBuffer.stop = animation.samplers[i].valueBuffer.start + gltfModel.bufferViews[animation.samplers[i].valueBuffer.bufferView].byteLength;
    }
    animation.channels = [];
    for(let i = 0; i < gltfModel.animations[0].channels.length; i++) {
        animation.channels[i] = {};
        animation.channels[i].joint = gltfModel.animations[0].channels[i].target.node;
        animation.channels[i].sampler = gltfModel.animations[0].channels[i].sampler;
        animation.channels[i].path = gltfModel.animations[0].channels[i].target.path;
    }
    console.log(animation);
    for(let i = 0; i < gltfModel.buffers.length; i++) {
        fetch(gltfModel.buffers[i].uri).then((res) => {
            res.arrayBuffer().then((data) => {
                if(vertexBuffer.buffer == i) {
                    vertexBuffer.data = new Float32Array(data.slice(vertexBuffer.start, vertexBuffer.stop));
                }
                if(normalBuffer.buffer == i) {
                    normalBuffer.data = new Float32Array(data.slice(normalBuffer.start, normalBuffer.stop));
                }
                if(uvBuffer.buffer == i) {
                    uvBuffer.data = new Float32Array(data.slice(uvBuffer.start, uvBuffer.stop));
                }
                if(indexBuffer.buffer == i) {
                    indexBuffer.data = new Uint16Array(data.slice(indexBuffer.start, indexBuffer.stop));
                }
                if(jointBuffer.buffer == i) {
                    if(gltfModel.accessors[jointBuffer.accessor].componentType == 5121) {
                        jointBuffer.data = new Uint8Array(data.slice(jointBuffer.start, jointBuffer.stop));
                    } else {
                        jointBuffer.data = new Uint16Array(data.slice(jointBuffer.start, jointBuffer.stop));
                    }
                }
                if(weightBuffer.buffer == i) {
                    weightBuffer.data = new Float32Array(data.slice(weightBuffer.start, weightBuffer.stop));
                }
                for(let j = 0; j < animation.samplers.length; j++) {
                    if(animation.samplers[j].timeBuffer.buffer == i) {
                        animation.samplers[j].timeBuffer.data = new Float32Array(data.slice(animation.samplers[j].timeBuffer.start, animation.samplers[j].timeBuffer.stop));
                    }
                    if(animation.samplers[j].valueBuffer.buffer == i) {
                        if(gltfModel.accessors[animation.samplers[j].valueBuffer.accessor].componentType == 5126) {
                            animation.samplers[j].valueBuffer.data = new Float32Array(data.slice(animation.samplers[j].valueBuffer.start, animation.samplers[j].valueBuffer.stop));
                        }
                    }
                }
                console.log(createAMO(gltfModel, vertexBuffer, normalBuffer, uvBuffer, jointBuffer, weightBuffer, indexBuffer, animation));
            });
        });
    }
}

function createOBJ(gltfModel, vertexBuffer, normalBuffer, uvBuffer, indexBuffer) {
    let OBJ = "#Generated by editamo\n";
    OBJ += `o ${gltfModel.meshes[0].name}\n\n`;
    for(let i = 0; i < vertexBuffer.count; i++) {
        OBJ += `v ${vertexBuffer.data[i*3]} ${vertexBuffer.data[i*3+1]} ${vertexBuffer.data[i*3+2]}\n`;
    }
    OBJ += "\n";
    for(let i = 0; i < normalBuffer.count; i++) {
        OBJ += `vn ${normalBuffer.data[i*3]} ${normalBuffer.data[i*3+1]} ${normalBuffer.data[i*3+2]}\n`
    }
    OBJ += "\n";
    for(let i = 0; i < uvBuffer.count; i++) {
        OBJ += `vt ${uvBuffer.data[i*2]} ${uvBuffer.data[i*2+1]}\n`;
    }
    OBJ += "\n";
    for(let i = 0; i < indexBuffer.count/3; i++) {
        OBJ += `f ${indexBuffer.data[i*3]+1}/${indexBuffer.data[i*3]+1}/${indexBuffer.data[i*3]+1} `
        OBJ += `${indexBuffer.data[i*3+1]+1}/${indexBuffer.data[i*3+1]+1}/${indexBuffer.data[i*3+1]+1} `
        OBJ += `${indexBuffer.data[i*3+2]+1}/${indexBuffer.data[i*3+2]+1}/${indexBuffer.data[i*3+2]+1}\n`;
    }
    return OBJ;
}

function createAMO(gltfModel, vertexBuffer, normalBuffer, uvBuffer, jointBuffer, weightBuffer, indexBuffer, animation) {
    let AMO = "#Generated by editamo\n";
    AMO += `ao ${gltfModel.meshes[0].name}\n\n`;
    for(let i = 0; i < vertexBuffer.count; i++) {
        AMO += `v ${vertexBuffer.data[i*3]} ${vertexBuffer.data[i*3+1]} ${vertexBuffer.data[i*3+2]}\n`;
    }
    AMO += "\n";
    for(let i = 0; i < normalBuffer.count; i++) {
        AMO += `vn ${normalBuffer.data[i*3]} ${normalBuffer.data[i*3+1]} ${normalBuffer.data[i*3+2]}\n`
    }
    AMO += "\n";
    for(let i = 0; i < uvBuffer.count; i++) {
        AMO += `vt ${uvBuffer.data[i*2]} ${uvBuffer.data[i*2+1]}\n`;
    }
    AMO += "\n";
    for(let i = 0; i < jointBuffer.count; i++) {
        AMO += `vj ${jointBuffer.data[i*4]+1} ${jointBuffer.data[i*4+1]+1} ${jointBuffer.data[i*4+2]+1} ${jointBuffer.data[i*4+3]+1}\n`;
    }
    AMO += "\n";
    for(let i = 0; i < weightBuffer.count; i++) {
        AMO += `vw ${weightBuffer.data[i*4]} ${weightBuffer.data[i*4+1]} ${weightBuffer.data[i*4+2]} ${weightBuffer.data[i*4+3]}\n`;
    }
    AMO += "\n";
    for(let i = 0; i < indexBuffer.count/3; i++) {
        AMO += `f ${indexBuffer.data[i*3]+1}/${indexBuffer.data[i*3]+1}/${indexBuffer.data[i*3]+1}/${indexBuffer.data[i*3]+1}/${indexBuffer.data[i*3]+1} `
        AMO += `${indexBuffer.data[i*3+1]+1}/${indexBuffer.data[i*3+1]+1}/${indexBuffer.data[i*3+1]+1}/${indexBuffer.data[i*3+1]+1}/${indexBuffer.data[i*3+1]+1} `
        AMO += `${indexBuffer.data[i*3+2]+1}/${indexBuffer.data[i*3+2]+1}/${indexBuffer.data[i*3+2]+1}/${indexBuffer.data[i*3+2]+1}/${indexBuffer.data[i*3+2]+1}\n`;
    }
    AMO += "\n";
    for(let i = 0; i < animation.joints.length; i++) {
        if(animation.joints[i].parent != undefined) {
            AMO += `j ${animation.joints[i].name} ${animation.joints[i].parent}\n`;
        } else {
            AMO += `j ${animation.joints[i].name} -1\n`;
        }
    }
    AMO += "\n";
    AMO += `a ${animation.name}\n\n`;
    for(let i = 0; i < animation.channels.length; i++) {
        let sampler = animation.samplers[animation.channels[i].sampler];
        for(let j = 0; j < sampler.timeBuffer.count; j++) {
            if(animation.channels[i].path == "translation") {
                AMO += `ap ${sampler.timeBuffer.data[j]} ${animation.channels[i].joint+1} ${sampler.valueBuffer.data[j*3]} ${sampler.valueBuffer.data[j*3+1]} ${sampler.valueBuffer.data[j*3+2]}\n`;
            } else if(animation.channels[i].path == "rotation") {
                AMO += `ar ${sampler.timeBuffer.data[j]} ${animation.channels[i].joint+1} ${sampler.valueBuffer.data[j*4]} ${sampler.valueBuffer.data[j*4+1]} ${sampler.valueBuffer.data[j*4+2]} ${sampler.valueBuffer.data[j*4+3]}\n`;
            }
        }
    }
    AMO += "\n";
    return AMO;
}