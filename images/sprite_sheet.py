import os, sys
import pygame
from pygame.locals import *

invertir_sprites = False

def create_sprite_sheet(input_folder, output_folder, row_height):
    pygame.init()

    font = pygame.font.Font(None, 36)

    folder_names = [name for name in os.listdir(input_folder) if os.path.isdir(os.path.join(input_folder, name))]
    final_sprite_images = []

    for folder_name in folder_names:
        if folder_name in ('concept', 'concept art'):
            continue
        folder_path = os.path.join(input_folder, folder_name)
        output_path = os.path.join(output_folder, f"{folder_name}.png")
        images = []

        invertir_despues = False
        for image_name in os.listdir(folder_path):
            if image_name.lower().endswith(".png"):
                image_path = os.path.join(folder_path, image_name)
                image = pygame.image.load(image_path)
                images.append(image)
                images[-1] = pygame.transform.flip(images[-1], invertir_sprites, False)
            if image_name == 'invertir':
                invertir_despues = True
        if invertir_despues:
            for i in range(len(images)):
                images[i] = pygame.transform.flip(images[i], True, False)

        if images:
            spacing = 10
            x_separation = max(image.get_width() for image in images)
            total_height = max(image.get_height() for image in images)
            total_width = (x_separation + spacing) * len(images) - spacing
            sprite_sheet = pygame.Surface((total_width, total_height), SRCALPHA)

            x_offset = 0
            for image in images:
                sprite_sheet.blit(image, (x_offset, 0))
                x_offset += x_separation + spacing

            final_sprite_images.append((sprite_sheet, font.render(folder_name, True, (255, 255, 0))))

    total_width = 0
    max_height = 0
    for image in final_sprite_images:
        total_width = max(total_width, image[0].get_width())
        #total_height += image.get_height()
        max_height = max(max_height, image[0].get_height())
    total_height = max_height * len(final_sprite_images)
    sprite_total_width = total_width
    total_width += max(image[1].get_width() for image in final_sprite_images)
    sprite_sheet = pygame.Surface((total_width, total_height), SRCALPHA)
    y_offset = 0
    for image in final_sprite_images:
        sprite_sheet.blit(image[0], (0, y_offset))
        y_offset += max_height
    y_offset = 0
    print('y separation = ' + str(max_height))
    for image in final_sprite_images:
        sprite_sheet.blit(image[1], (sprite_total_width, y_offset))
        y_offset += max_height
    output_path = os.path.join(output_folder, f"{input_folder}.png")
    pygame.image.save(sprite_sheet, output_path)

    pygame.quit()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print('Falta el nombre de la carpeta de donde sacar los sprites!')
        exit()
    if len(sys.argv) > 2:
        invertir_sprites = True
    input_folder = sys.argv[1]
    output_folder = "sprite_sheets"

    create_sprite_sheet(input_folder, output_folder, 100)

