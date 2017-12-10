#include <string>
#include <SFML/Graphics.hpp>
#include "sprite_entity.h"
#include "world.h"

EntitySprite::EntitySprite(std::string filename, float x, float y, float scale)
{
    txt.loadFromFile(filename);
    spr.setTexture(txt);
    spr.setOrigin(txt.getSize().x / 2.f, txt.getSize().y / 2.f);
    position.x = x;
    position.y = y;
    spr.setPosition(x, y);
    spr.setScale(scale, scale);
    tag = filename;
};

EntitySprite::EntitySprite(std::string filename, float x, float y) :
    EntitySprite(filename, x, y, 1.f)
{}

void EntitySprite::event(sf::Event &e) {}

void EntitySprite::tick(std::vector<Entity*> &entities)
{
    spr.setPosition(position.x, position.y);
}

void EntitySprite::draw(sf::RenderWindow &window)
{
    spr.move(-world->camera);
    window.draw(spr);
    spr.move(world->camera);
}
