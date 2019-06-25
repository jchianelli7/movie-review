<?php

namespace App\Repository;

use App\Entity\Movie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Movie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Movie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Movie[]    findAll()
 * @method Movie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MovieRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Movie::class);
    }

    /**
     * Transforms a movie object to JSON
     *
     * @return Movie A JSON version of the movie
     */
    public function transform(Movie $movie)
    {
        return [
            'id' => (int)$movie->getId(),
            'title' => (string)$movie->getTitle(),
            'rating' => $movie->getRating()
        ];
    }

    /**
     * Transforms all movie objects to JSON
     *
     * @return moviesArray An array of all movies as JSON
     */
    public function transformAll()
    {
        $movies = $this->findAll();
        $moviesArray = [];

        foreach ($movies as $movie) {
            $moviesArray[] = $this->transform($movie);
        }

        return $moviesArray;
    }

    // /**
    //  * @return Movie[] Returns an array of Movie objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Movie
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
