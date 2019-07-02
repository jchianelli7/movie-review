<?php
namespace App\Controller;

use App\Entity\Movie;
use App\Repository\MovieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;


class MovieController extends ApiController
{
    /**
     * @Route("/movies", methods="GET")
     */
    public function index(MovieRepository $movieRepository)
    {
        $movies = $movieRepository->transformAll();

        return $this->respond($movies);
    }

    /**
     * @Route("/movies", methods="POST")
     */
    public function create(Request $request, MovieRepository $movieRepository, EntityManagerInterface $em)
    {
        // validate the title
        if (! $request->get('title')) {
            return $this->respondValidationError('Please provide a title!');
        }

        // validate the rating
        if (! $request->get('rating')) {
            return $this->respondValidationError('Please provide a rating!');
        }

        // validate the rating
        if (! is_numeric($request->get('rating'))) {
            return $this->respondValidationError('Error, ratings must be numeric');
        }



        // persist the new movie
        $movie = new Movie;
        $movie->setTitle($request->get('title'));
        $movie->setRating($request->get('rating'));
        $em->persist($movie);
        $em->flush();

        return $this->respondCreated($movieRepository->transform($movie));
    }

    /**
     * @Route("/movies/rating", methods="POST")
     */
    public function increaseRating(Request $request, EntityManagerInterface $em, MovieRepository $movieRepository)
    {
        // validate the id
        if (! $request->get('id')) {
            return $this->respondValidationError('Movie not found');
        }

        // validate the movie
        $movie = $movieRepository->find($request->get('id'));

        if (! $movie) {
            return $this->respondNotFound();
        }

        $movie->setRating($request->get('rating'));
        $em->persist($movie);
        $em->flush();

        return $this->respond([
            'rating' => $movie->getRating()
        ]);
    }

}
