<?php
namespace App\Controller;

use App\Entity\Movie;
use App\Repository\MovieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
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
        $request = $this->transformJsonBody($request);

        if (! $request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        // validate the title
        if (! $request->get('title')) {
            return $this->respondValidationError('Please provide a title!');
        }

        // persist the new movie
        $movie = new Movie;
        $movie->setTitle($request->get('title'));
        $movie->setCount(0);
        $em->persist($movie);
        $em->flush();

        return $this->respondCreated($movieRepository->transform($movie));
    }

    /**
     * @Route("/movies/{id}/rating", methods="POST")
     */
    public function increaseRating($id, EntityManagerInterface $em, MovieRepository $movieRepository)
    {
        $movie = $movieRepository->find($id);

        if (! $movie) {
            return $this->respondNotFound();
        }

        $movie->setRating($movie->getRating() + 1);
        $em->persist($movie);
        $em->flush();

        return $this->respond([
            'rating' => $movie->getRating()
        ]);
    }

}
