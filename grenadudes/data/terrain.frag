// fragment shader for rendering terrain

uniform sampler2D txtTerrain; // terrain image texture
uniform sampler2D txtData;    // terrain data texture
uniform float sizeX;          // size of rendering space
uniform float sizeY;          // ^
uniform float screenHeight;   // height of the screen in pixels
uniform float cameraX;
uniform float cameraY;

void main() {
    // calculate texture lookup coordinates
    vec4 dataCoord;
    dataCoord.x = gl_FragCoord.x + cameraX;
    dataCoord.y = gl_FragCoord.y - cameraY;
    dataCoord.x = dataCoord.x / sizeX;
    dataCoord.y = (screenHeight - dataCoord.y) / sizeY; // y needs to be flipped for some reason
    
    
    
    if (dataCoord.x >= 0 || dataCoord.y >= 0 || dataCoord.x < sizeX || dataCoord.y < sizeY) {
        // get the pixel we are rendering & add color
        vec4 pixel = texture2D(txtTerrain, gl_TexCoord[0].xy);
        gl_FragColor = gl_Color * pixel;
        
        // make pixel transparent if no terrain here (black)
        vec4 dataPixel = texture2D(txtData, dataCoord.xy);
        if (dataPixel.r == 0 && dataPixel.g == 0 && dataPixel.b == 0) {
            gl_FragColor.a = 0;
        }   
    }
}