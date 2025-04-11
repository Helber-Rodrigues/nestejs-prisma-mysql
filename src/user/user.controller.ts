import { Controller, Post, Body, Get, Put, Patch, Delete, UseInterceptors, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enum/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";


@Roles(Role.Admin)
@UseGuards(AuthGuard,RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) {}

  //@UseGuards(ThrottlerGuard)
  @Post()
  async create(@Body() data:CreateUserDto) {
    return this.userService.create(data);
  }

  
  @Get()
  async list() {
    return this.userService.list();  
  }

  
  @Get(':id')
  async show(@ParamId() id:number) {
    console.log({id});
    return this.userService.show(id);
  }

  
  @Put(':id')
  async update(@Body() data :UpdatePutUserDto, @ParamId() id:number) {
    return this.userService.update(id,data);
  }

  
  @Patch(':id')
  async updatePartial(@Body() data:UpdatePatchUserDto, @ParamId() id:number) {
    return this.userService.updatePartial(id,data);
  }

  //@Roles(Role.Admin)
  @Delete(':id')
  async delete(@ParamId() id:number) {
    return this.userService.delete(id);
  }

}