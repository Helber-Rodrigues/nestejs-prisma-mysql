import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";
import e from "express";

export const User = createParamDecorator((filter: string, context: ExecutionContext) => {

    const request = context.switchToHttp().getRequest();
    
    if(request.user){
        if(filter){
            return request.user[filter];
        }else{
            return request.user;
        }

    } else {

        throw new NotFoundException('Usuário não encontrado no Request. Use o AuthGuard pra obter o usuário!');
    }   


}); 