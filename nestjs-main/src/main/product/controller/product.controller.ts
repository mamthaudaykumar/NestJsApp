import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductService } from '../service/product.service';
import { ProductRequest } from '../request/product.request';
import { ProductDto } from '../dto/product.dto';
import { PageDtoProduct } from '../dto/pagedProduct.dto';
import { RolesGuard } from 'src/main/config/guard/cfg-roles.guard';
import { Roles } from  'src/main/config/guard/role.decorator';

@ApiTags('Product')
@Controller('admin/product')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'List products' })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of products',
    type: PageDtoProduct,
  })
  @ApiResponse({ status: 400, description: 'Invalid query params' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async find(
    @Query() query: { search?: string; limit?: number; offset?: number },
  ) {
    const { limit = 10, offset = 0, search } = query;
    return this.productService.findAll(search, limit, offset);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single product' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Product found', type: ProductDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getProduct(@Param('id') productId: string) {
    return this.productService.findById(productId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ status: 201, description: 'Product created', type: ProductDto })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createProduct(@Body() body: ProductRequest) {
    return this.productService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Product updated', type: ProductDto })
  @ApiResponse({ status: 400, description: 'Invalid request body' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - user mismatch' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateProduct(
    @Param('id') productId: string,
    @Body() body: ProductRequest,
  ) {
    return this.productService.update(productId, body);
  }

  @Delete(':id')
  @HttpCode(204) // DELETE should return 204 No Content on success
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Product deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - user mismatch' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async delete(@Param('id') productId: string) {
    return this.productService.delete(productId);
  }
}
