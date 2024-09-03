import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const isProduction = process.env.PRODUCTION

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //SWAGGER CONFIG
  const config = new DocumentBuilder()
  .setTitle("Leafyshop Api")
  .setDescription("La api de nuestra tienda virtual LeafyShop")
  .setVersion("1.0")
  .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("docs", app, document)

  // CORS CONFIG
  app.enableCors({
    origin : isProduction ? "" : "*"
  })

  // LISTEN
  await app.listen(3000);
}
bootstrap();
