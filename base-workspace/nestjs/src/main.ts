import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { MyWinstonLogger } from './common/config/logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyWinstonLogger(),
  });
  app.use(cookieParser());

  app.setGlobalPrefix(`api/v1`);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các trường không có trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu gửi trường "lạ"
      transform: true, // Tự động convert kiểu dữ liệu
    }),
  );

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('Nestjs API') // Tiêu đề dự án
    .setDescription('Tài liệu API cho hệ thống Todo & OAuth2') // Mô tả
    .setVersion('1.0')
    .addBearerAuth() // Nếu bro dùng JWT thì thêm dòng này để có nút "Authorize" khóa móc
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/document', app, document);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
