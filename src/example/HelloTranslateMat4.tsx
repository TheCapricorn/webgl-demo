import * as React from 'react';
import { getWebGLContext, initShaders } from "lib/cuon-utils";

const { useEffect, useRef } = React;

const VSHADER_SOURECE =
    'attribute vec4 a_Postion;\n' +
    'uniform mat4 u_Matrix;\n' +
    'void main(){\n' +
    'gl_Position= u_Matrix*a_Postion;\n' +
    '}'
const FSHADER_SOURCE =
    'void main(){\n' +
    'gl_FragColor=vec4(1.0,0.0,0.0,1.0);\n' +
    '}'

const initVertexBuffer = function (gl: any) {
    const n=3;
    const vertexBuffer = gl.creatBuffer();
    const vertices = new Float32Array([
        -0.5, 0.5, 0.5, -0.5, 0.2, 0.5
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const a_Postion = gl.getAttribLocation(gl.program, 'a_Postion');
    gl.vertexAttribPointer(a_Postion, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Postion);

    return n;
}



const HelloTranslateMat4 = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const gl: any = getWebGLContext(canvasRef.current, true);
        const ANGLE= 120.0
        const radian = Math.PI*ANGLE/180.0;
        const cosB= Math.cos(radian);
        const sinB= Math.sin(radian);
        if (!gl) {
            return;
        }
        if (!initShaders(gl, VSHADER_SOURECE, FSHADER_SOURCE)) {
            return;
        }
        const n = initVertexBuffer(gl);
        const u_Matrix= gl.getUniformLocation(gl.program,'u_Matrix');
        const xFormMatrix=new Float32Array([
            cosB,sinB,0.0,0.0,
            -sinB,cosB,0.0,0.0,
            0.0,0.0,1.0,0.0,
            0.0,0.0,0.0,1.0,

        ]);
        gl.uniformMatrix4fv(u_Matrix);
        gl.clearColor(0.0,0.0,0.0,1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES,0,n);
    })
    return (
        <canvas ref={canvasRef} />
    )
}

export default HelloTranslateMat4
