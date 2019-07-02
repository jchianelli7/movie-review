<?php

namespace App\DataFixtures;

use App\Entity\Movie;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $movie = new Movie();
        $movie->setTitle('Jaws');
        $movie->setRating('9.4');
        $manager->persist($movie);

        $movie = new Movie();
        $movie->setTitle('Gladiator');
        $movie->setRating('9.2');
        $manager->persist($movie);

        $manager->flush();
    }
}
