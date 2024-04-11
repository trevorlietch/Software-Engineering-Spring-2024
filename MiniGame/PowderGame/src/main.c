#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

#include <raylib.h>

/*
-------------------------------------------------------------------------------------------------
| Welcome to my epic powder game. Don't look too deep into the code its pretty fucking wack lol |
-------------------------------------------------------------------------------------------------
*/
const int width = 1080; 
const int height = 720;

const int scale = 4;

const int cellx = (width/scale); 
const int celly = (height/scale); 

typedef enum materialType {
    EMPTY,  //0
    SAND,   //1
    WATER,  //2
    STEAM,  //3
    FIRE,   //4
    BORDER  //5 
} materialType; 

typedef struct {
    materialType type;
    bool hasUpdated;

    Color color;

} particle; 

particle grid[cellx][celly];

bool isType(int x, int y, materialType type){
    if (grid[x][y].type == type){
        return true; 
    }
    return false; 
}

bool isUpdated(int x, int y){
    if(grid[x][y].hasUpdated == true){
        return true; 
    }
    return false; 
} 

void set(int x, int y, materialType type){
    particle current;
    switch (type){
        case EMPTY: 
            current = (particle){EMPTY,false,BLACK};
        break;
        case SAND:
            current = (particle){SAND,false,YELLOW};
        break;
        case WATER: 
            current = (particle){WATER,false,BLUE};
        break;
        case BORDER:
            current = (particle){BORDER,false,GRAY}; 
        break;
    }

    grid[x][y] = current;
}



void swap(int x1, int y1, int x2, int y2){
    particle temp = grid[x2][y2];

    grid[x2][y2] = grid[x1][y1]; 
    grid[x1][y1] = temp; 

    grid[x1][y1].hasUpdated = true; 
    grid[x2][y2].hasUpdated = true; 

    //printf(" POS1 : %d ",grid[x1][y1].hasUpdated);
    //printf(" POS2 : %d \n",grid[x2][y2].hasUpdated);
}

void paintParticles(int x, int y, materialType type, int radius, int sparcity){
    //printf("PAINTING AT: (%d %d) \n", x, y);
    
    for(int j = -radius; j <= radius; j++){
        for(int i = -radius; i <= radius; i++){

            int xOffset = i + x; 
            int yOffset = j + y;

            if((-1 < yOffset && yOffset < celly) && (-1 < xOffset && xOffset < cellx == true)){ //Bounds Checking 

                if(isType(xOffset,yOffset,BORDER) == false){

                    int random = rand() % sparcity;

                    if(random == 0){
                        set(xOffset,yOffset,type);
                    }
                }
            }
        }
    }
}

void setBorders(){
    for(int i = 0; i < cellx; i++){
        set(i,0,BORDER);
        set(i,celly-1,BORDER);
    }

    for(int j = 0; j < celly; j++){
        set(0,j,BORDER);
        set(cellx-1,j,BORDER);
    }
}

void initGrid(){
    for(int j = 0; j < celly; j++){
        for(int i = 0; i < cellx; i++){
            set(i,j,EMPTY);
        }
    }
    setBorders();
}

void randomizeGrid(){

    for(int j = 0; j < celly; j++){
        for(int i = 0; i < cellx; i++){
            if(isType(i,j,EMPTY)){

                int random = rand() % 3;
                set(i,j,random);
            }
        }
    }
}

void printGrid(){
    
    printf("Starting print grid \n"); 

    for(int j = 0; j < celly; j++){
        for(int i = 0; i < cellx; i++){
            printf(" %d",grid[i][j].type);
        }
        printf("\n");
    }
}

void drawScreen(){

    ClearBackground(BLACK);

    for (int j = 0; j < celly; j++){ //y
        for(int i = 0; i < cellx; i++){ //x
            particle current = grid[i][j];

            if (current.type != EMPTY){
                DrawRectangle(i*scale,j*scale,scale,scale,current.color);
            }
            grid[i][j].hasUpdated = false;
        }
    }
}

void update(){
    for(int j = celly-1; j > -1; j--){
        for(int i = 0; i < cellx; i++){
            particle current = grid[i][j];
            if (current.hasUpdated == false){

                int random = rand() % 2;
                
                switch (current.type){
                    case SAND:
                        if(isType(i,j+1,EMPTY) || (isType(i,j+1,WATER) && isUpdated(i,j+1) == false)){ //Down
                            swap(i,j,i,j+1);
                        }
                        else if(isType(i-1,j+1,EMPTY) && isType(i+1,j+1,EMPTY)){
                            if (random == 1){
                                swap(i,j,i+1,j+1); // Down Right
                            }
                            else{
                                swap(i,j,i-1,j+1); //Down Left
                            }
                        }
                        else if(isType(i-1,j+1,EMPTY)){
                            swap(i,j,i-1,j+1);
                        }
                        else if(isType(i+1,j+1,EMPTY)){
                            swap(i,j,i+1,j+1);
                        }
                    break;
                    case WATER:
                        if(isType(i,j+1,EMPTY)){ //Down
                            swap(i,j,i,j+1);
                        }
                        else if(isType(i-1,j+1,EMPTY)){ //Down Left
                            swap(i,j,i-1,j+1);
                        }
                        else if(isType(i+1,j+1,EMPTY)){ //Down Right
                            swap(i,j,i+1,j+1);
                        }
                        else if(isType(i+1,j, EMPTY)){ //Right
                            swap(i,j,i+1,j);
                        }
                        else if(isType(i-1,j,EMPTY)){ //Left
                            swap(i,j,i-1,j);
                        }
                    break;
                }
            }
        }
    }
}

int main(void) { 

    printf("WIDTH: %d \n",cellx);
    printf("HEIGHT %d \n",celly); 

    //World Settings

    srand(time(NULL));
    
    //Brush Settings 

    materialType currentType = SAND; 
    int radius = 0;
    int sparcity = 2; 

    //Init Window

    int speed = 60;

    InitWindow(width,height,"Game");    
    SetTargetFPS(speed);

    //Init World

    initGrid();
    randomizeGrid();

    //Main Loop

    while (!WindowShouldClose()) {
 
        //Drawing

        BeginDrawing();

        update();

        drawScreen();

        
        //Inputs

        if(IsKeyDown(KEY_F)){
            DrawFPS(0,0);
        }

        if(IsKeyDown(KEY_R)){
            initGrid();
            //randomizeGrid();
        }

        if(IsKeyDown(KEY_S)){
            currentType = SAND;
        }
        if(IsKeyDown(KEY_W)){
            currentType = WATER;
        }
        if(IsKeyDown(KEY_E)){
            currentType = EMPTY;
        }
        if(IsKeyPressed(KEY_UP)){
            radius++;
        }
        if(IsKeyPressed(KEY_DOWN)){
            radius--;
        }

        if(IsMouseButtonDown(MOUSE_BUTTON_LEFT)){
            int mx = GetMouseX()/scale;
            int my = GetMouseY()/scale;

            paintParticles(mx,my,currentType,radius,sparcity);
        }

        EndDrawing();
    }


    CloseWindow();
    
    return 0;
}